#!/usr/bin/env node

/**
 * Bundle Size Monitor Script
 * 
 * Monitors bundle sizes and alerts on regressions
 * Integrates with CI/CD for automated size monitoring
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bundle size limits (in KB)
const BUNDLE_LIMITS = {
  'main.js': 500,      // Main bundle
  'vendor.js': 300,    // Vendor dependencies
  'total': 800,        // Total bundle size
  'gzip': 250          // Gzipped total
};

function getBundleSize() {
  try {
    const distPath = path.join(__dirname, '../dist');
    if (!fs.existsSync(distPath)) {
      console.log('⚠️ No dist directory found');
      return null;
    }

    const bundles = {};
    let totalSize = 0;

    // Find all JS files
    const jsFiles = findJSFiles(distPath);
    
    for (const file of jsFiles) {
      const stats = fs.statSync(file);
      const sizeKB = Math.round(stats.size / 1024);
      const fileName = path.basename(file);
      
      bundles[fileName] = {
        size: sizeKB,
        sizeBytes: stats.size,
        path: file
      };
      
      totalSize += sizeKB;
    }

    return {
      bundles,
      totalSize,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error calculating bundle size:', error.message);
    return null;
  }
}

function findJSFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files = files.concat(findJSFiles(fullPath));
    } else if (item.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function compareWithBaseline(current) {
  const baselinePath = path.join(__dirname, '../bundle-baseline.json');
  
  if (!fs.existsSync(baselinePath)) {
    console.log('📝 Creating baseline bundle size...');
    fs.writeFileSync(baselinePath, JSON.stringify(current, null, 2));
    return { status: 'baseline_created', changes: [] };
  }
  
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  const changes = [];
  
  // Compare total size
  const totalChange = current.totalSize - baseline.totalSize;
  const totalChangePercent = (totalChange / baseline.totalSize) * 100;
  
  if (Math.abs(totalChangePercent) > 5) { // Alert on 5% change
    changes.push({
      type: 'total',
      current: current.totalSize,
      baseline: baseline.totalSize,
      change: totalChange,
      changePercent: totalChangePercent,
      severity: totalChange > 0 ? 'warning' : 'improvement'
    });
  }
  
  // Compare individual bundles
  for (const [bundle, data] of Object.entries(current.bundles)) {
    if (baseline.bundles[bundle]) {
      const bundleChange = data.size - baseline.bundles[bundle].size;
      const bundleChangePercent = (bundleChange / baseline.bundles[bundle].size) * 100;
      
      if (Math.abs(bundleChangePercent) > 10) { // Alert on 10% change
        changes.push({
          type: 'bundle',
          bundle,
          current: data.size,
          baseline: baseline.bundles[bundle].size,
          change: bundleChange,
          changePercent: bundleChangePercent,
          severity: bundleChange > 0 ? 'warning' : 'improvement'
        });
      }
    }
  }
  
  return {
    status: changes.length > 0 ? 'changes_detected' : 'no_changes',
    changes
  };
}

function checkLimits(current) {
  const violations = [];
  
  // Check total size limit
  if (current.totalSize > BUNDLE_LIMITS.total) {
    violations.push({
      type: 'total_size',
      current: current.totalSize,
      limit: BUNDLE_LIMITS.total,
      severity: 'error'
    });
  }
  
  // Check individual bundle limits
  for (const [bundle, data] of Object.entries(current.bundles)) {
    const limit = BUNDLE_LIMITS[bundle];
    if (limit && data.size > limit) {
      violations.push({
        type: 'bundle_size',
        bundle,
        current: data.size,
        limit,
        severity: 'error'
      });
    }
  }
  
  return violations;
}

function generateReport(current, comparison, violations) {
  const report = {
    timestamp: new Date().toISOString(),
    current,
    comparison,
    violations,
    summary: {
      totalSize: current.totalSize,
      bundleCount: Object.keys(current.bundles).length,
      violations: violations.length,
      changes: comparison.changes.length,
      status: violations.length > 0 ? 'failed' : comparison.status === 'changes_detected' ? 'warning' : 'passed'
    }
  };
  
  // Save detailed report
  fs.writeFileSync(
    path.join(__dirname, '../bundle-size-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  // Generate HTML report
  const htmlReport = generateHTMLReport(report);
  fs.writeFileSync(
    path.join(__dirname, '../bundle-size-report.html'),
    htmlReport
  );
  
  return report;
}

function generateHTMLReport(report) {
  const { current, comparison, violations, summary } = report;
  
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Bundle Size Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .status-passed { color: #28a745; }
        .status-warning { color: #ffc107; }
        .status-failed { color: #dc3545; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .metric-card { background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff; }
        .violation { background: #f8d7da; border-left-color: #dc3545; }
        .improvement { background: #d4edda; border-left-color: #28a745; }
        .warning { background: #fff3cd; border-left-color: #ffc107; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f2f2f2f; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📦 Bundle Size Report</h1>
        <p>Generated: ${new Date(report.timestamp).toLocaleString()}</p>
        <div class="status-${summary.status}">
            Status: ${summary.status.toUpperCase()}
        </div>
    </div>

    <div class="metrics">
        <div class="metric-card">
            <h3>Total Size</h3>
            <p><strong>${summary.totalSize} KB</strong></p>
            <p>${summary.bundleCount} bundles</p>
        </div>
        
        <div class="metric-card">
            <h3>Violations</h3>
            <p><strong>${summary.violations}</strong></p>
        </div>
        
        <div class="metric-card">
            <h3>Changes</h3>
            <p><strong>${summary.changes}</strong></p>
        </div>
    </div>

    ${violations.length > 0 ? `
    <h2>❌ Size Violations</h2>
    <table>
        <tr><th>Type</th><th>Bundle</th><th>Current</th><th>Limit</th></tr>
        ${violations.map(v => `
            <tr>
                <td>${v.type.replace('_', ' ')}</td>
                <td>${v.bundle || '-'}</td>
                <td>${v.current} KB</td>
                <td>${v.limit} KB</td>
            </tr>
        `).join('')}
    </table>
    ` : ''}

    ${comparison.changes.length > 0 ? `
    <h2>📊 Size Changes</h2>
    <table>
        <tr><th>Type</th><th>Bundle</th><th>Current</th><th>Baseline</th><th>Change</th></tr>
        ${comparison.changes.map(c => `
            <tr class="${c.severity}">
                <td>${c.type}</td>
                <td>${c.bundle || 'Total'}</td>
                <td>${c.current} KB</td>
                <td>${c.baseline} KB</td>
                <td>${c.change > 0 ? '+' : ''}${c.change} KB (${c.changePercent.toFixed(1)}%)</td>
            </tr>
        `).join('')}
    </table>
    ` : ''}

    <h2>📋 Bundle Details</h2>
    <table>
        <tr><th>Bundle</th><th>Size (KB)</th><th>Size (Bytes)</th></tr>
        ${Object.entries(current.bundles).map(([bundle, data]) => `
            <tr>
                <td>${bundle}</td>
                <td>${data.size} KB</td>
                <td>${data.sizeBytes.toLocaleString()}</td>
            </tr>
        `).join('')}
    </table>
</body>
</html>
  `;
}

// Main execution
async function main() {
  console.log('📦 Analyzing bundle sizes...');
  
  const current = getBundleSize();
  if (!current) {
    process.exit(1);
  }
  
  console.log(`📊 Total bundle size: ${current.totalSize} KB`);
  console.log(`📁 Found ${Object.keys(current.bundles).length} bundles`);
  
  const comparison = compareWithBaseline(current);
  const violations = checkLimits(current);
  
  const report = generateReport(current, comparison, violations);
  
  console.log('\n📈 Bundle Size Analysis:');
  console.log(`  Total Size: ${current.totalSize} KB`);
  console.log(`  Status: ${report.summary.status}`);
  
  if (violations.length > 0) {
    console.log('\n❌ Size Violations:');
    violations.forEach(v => {
      console.log(`  ${v.bundle || 'Total'}: ${v.current} KB > ${v.limit} KB`);
    });
  }
  
  if (comparison.changes.length > 0) {
    console.log('\n📊 Size Changes:');
    comparison.changes.forEach(c => {
      const sign = c.change > 0 ? '+' : '';
      console.log(`  ${c.bundle || 'Total'}: ${sign}${c.change} KB (${c.changePercent.toFixed(1)}%)`);
    });
  }
  
  console.log('\n📄 Reports generated:');
  console.log('  - bundle-size-report.json');
  console.log('  - bundle-size-report.html');
  
  // Exit with error code if there are violations
  if (violations.length > 0) {
    console.log('\n❌ Bundle size violations detected!');
    process.exit(1);
  } else {
    console.log('\n✅ All bundle sizes within limits!');
  }
}

main().catch(console.error);
