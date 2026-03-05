#!/usr/bin/env node

/**
 * Performance Test Script
 * 
 * Tests Core Web Vitals and performance metrics
 * Generates performance reports for CI/CD
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function measurePerformance() {
  console.log('📊 Measuring Core Web Vitals...');
  
  const metrics = {};
  
  // Measure Core Web Vitals
  try {
    metrics.cls = await new Promise(resolve => {
      getCLS(value => resolve(value));
    });
    
    metrics.fid = await new Promise(resolve => {
      getFID(value => resolve(value));
    });
    
    metrics.fcp = await new Promise(resolve => {
      getFCP(value => resolve(value));
    });
    
    metrics.lcp = await new Promise(resolve => {
      getLCP(value => resolve(value));
    });
    
    metrics.ttfb = await new Promise(resolve => {
      getTTFB(value => resolve(value));
    });
    
  } catch (error) {
    console.warn('⚠️ Could not measure some metrics:', error.message);
  }
  
  // Additional performance metrics
  const performanceMetrics = {
    timestamp: new Date().toISOString(),
    coreWebVitals: metrics,
    thresholds: {
      cls: { good: 0.1, needsImprovement: 0.25 },
      fid: { good: 100, needsImprovement: 300 },
      fcp: { good: 1800, needsImprovement: 3000 },
      lcp: { good: 2500, needsImprovement: 4000 },
      ttfb: { good: 800, needsImprovement: 1800 }
    },
    bundleSize: getBundleSize(),
    memoryUsage: getMemoryUsage()
  };
  
  // Save current performance data
  fs.writeFileSync(
    path.join(__dirname, '../performance-current.json'),
    JSON.stringify(performanceMetrics, null, 2)
  );
  
  // Evaluate performance
  evaluatePerformance(performanceMetrics);
  
  console.log('✅ Performance measurement completed');
  return performanceMetrics;
}

function getBundleSize() {
  try {
    const distPath = path.join(__dirname, '../dist-web');
    if (fs.existsSync(distPath)) {
      const stats = fs.statSync(distPath);
      return {
        totalSizeKB: Math.round(stats.size / 1024),
        jsFiles: countJSFiles(distPath),
        cssFiles: countCSSFiles(distPath)
      };
    }
  } catch (error) {
    console.warn('⚠️ Could not calculate bundle size:', error.message);
  }
  return null;
}

function countJSFiles(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      count += countJSFiles(filePath);
    } else if (file.endsWith('.js')) {
      count++;
    }
  }
  
  return count;
}

function countCSSFiles(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      count += countCSSFiles(filePath);
    } else if (file.endsWith('.css')) {
      count++;
    }
  }
  
  return count;
}

function getMemoryUsage() {
  const usage = process.memoryUsage();
  return {
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100,
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100,
    external: Math.round(usage.external / 1024 / 1024 * 100) / 100,
    rss: Math.round(usage.rss / 1024 / 1024 * 100) / 100
  };
}

function evaluatePerformance(metrics) {
  console.log('📈 Evaluating performance...');
  
  const { coreWebVitals, thresholds } = metrics;
  let issues = [];
  
  for (const [metric, value] of Object.entries(coreWebVitals)) {
    if (value && thresholds[metric]) {
      const threshold = thresholds[metric];
      
      if (value > threshold.needsImprovement) {
        issues.push({
          metric: metric.toUpperCase(),
          value,
          status: 'POOR',
          recommendation: getRecommendation(metric, value)
        });
      } else if (value > threshold.good) {
        issues.push({
          metric: metric.toUpperCase(),
          value,
          status: 'NEEDS IMPROVEMENT',
          recommendation: getRecommendation(metric, value)
        });
      }
    }
  }
  
  if (issues.length > 0) {
    console.log(`⚠️ Found ${issues.length} performance issue(s):`);
    issues.forEach(issue => {
      console.log(`  ${issue.metric}: ${issue.status} (${issue.value})`);
      console.log(`  💡 ${issue.recommendation}`);
    });
  } else {
    console.log('✅ All performance metrics are good!');
  }
  
  // Save issues for CI
  fs.writeFileSync(
    path.join(__dirname, '../performance-issues.json'),
    JSON.stringify(issues, null, 2)
  );
}

function getRecommendation(metric, value) {
  const recommendations = {
    cls: 'Reduce layout shifts by optimizing images and ads',
    fid: 'Reduce JavaScript execution time and main thread work',
    fcp: 'Optimize server response time and resource loading',
    lcp: 'Optimize largest contentful paint (images, text)',
    ttfb: 'Improve server response time and reduce redirects'
  };
  
  return recommendations[metric] || 'Optimize overall performance';
}

// Run performance test
measurePerformance().catch(console.error);
