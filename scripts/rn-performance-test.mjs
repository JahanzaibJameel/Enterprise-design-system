#!/usr/bin/env node

/**
 * React Native Performance Test
 * 
 * Tests RN-specific performance metrics
 * Analyzes component render performance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function testRNPerformance() {
  console.log('📱 Testing React Native performance...');
  
  const rnMetrics = {
    timestamp: new Date().toISOString(),
    componentPerformance: analyzeComponentPerformance(),
    renderPerformance: analyzeRenderPerformance(),
    memoryLeaks: checkMemoryLeaks(),
    animationPerformance: testAnimationPerformance()
  };
  
  // Save RN performance data
  fs.writeFileSync(
    path.join(__dirname, '../rn-performance.json'),
    JSON.stringify(rnMetrics, null, 2)
  );
  
  evaluateRNPerformance(rnMetrics);
  
  console.log('✅ RN performance test completed');
  return rnMetrics;
}

function analyzeComponentPerformance() {
  console.log('🔍 Analyzing component performance...');
  
  const components = [];
  const srcDir = path.join(__dirname, '../src/components');
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Analyze component complexity
        const complexity = {
          name: file.replace(/\.(ts|tsx)$/, ''),
          lines: content.split('\n').length,
          hooks: (content.match(/use[A-Z]/g) || []).length,
          effects: (content.match(/useEffect/g) || []).length,
          states: (content.match(/useState/g) || []).length,
          complexity: calculateComplexity(content)
        };
        
        components.push(complexity);
      }
    }
  }
  
  return components;
}

function calculateComplexity(content) {
  // Simple complexity calculation based on control structures
  const complexityKeywords = ['if', 'else', 'for', 'while', 'switch', 'case', 'try', 'catch'];
  let score = 0;
  
  for (const keyword of complexityKeywords) {
    const matches = content.match(new RegExp(`\\b${keyword}\\b`, 'g'));
    score += matches ? matches.length : 0;
  }
  
  // Add points for nested structures
  const nestingLevel = (content.match(/{/g) || []).length;
  score += nestingLevel * 0.5;
  
  return Math.round(score * 10) / 10;
}

function analyzeRenderPerformance() {
  console.log('⚡ Analyzing render performance...');
  
  return {
    reRenders: estimateReRenders(),
    stateUpdates: estimateStateUpdates(),
    propDrilling: checkPropDrilling(),
    memoization: checkMemoization()
  };
}

function estimateReRenders() {
  // Estimate potential re-renders based on component structure
  const srcDir = path.join(__dirname, '../src/components');
  let reRenderCount = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for potential re-render issues
        if (!content.includes('React.memo') && !content.includes('useMemo')) {
          reRenderCount++;
        }
      }
    }
  }
  
  return {
    componentsAtRisk: reRenderCount,
    recommendation: reRenderCount > 0 ? 'Consider memoizing components' : 'Good memoization'
  };
}

function estimateStateUpdates() {
  // Estimate state update frequency
  const srcDir = path.join(__dirname, '../src/components');
  let stateUpdateCount = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        stateUpdateCount += (content.match(/set[A-Z]/g) || []).length;
      }
    }
  }
  
  return {
    totalStateUpdates: stateUpdateCount,
    averagePerComponent: Math.round(stateUpdateCount / 10 * 10) / 10
  };
}

function checkPropDrilling() {
  // Check for prop drilling patterns
  const srcDir = path.join(__dirname, '../src/components');
  let propDrillingScore = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Look for deep prop passing
        const propMatches = content.match(/\w+\.\w+\.\w+/g) || [];
        propDrillingScore += propMatches.length;
      }
    }
  }
  
  return {
    score: propDrillingScore,
    recommendation: propDrillingScore > 5 ? 'Consider using context or state management' : 'Good prop structure'
  };
}

function checkMemoization() {
  // Check memoization usage
  const srcDir = path.join(__dirname, '../src/components');
  let memoizedComponents = 0;
  let totalComponents = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        totalComponents++;
        
        if (content.includes('React.memo') || content.includes('useMemo') || content.includes('useCallback')) {
          memoizedComponents++;
        }
      }
    }
  }
  
  return {
    memoizedComponents,
    totalComponents,
    percentage: totalComponents > 0 ? Math.round(memoizedComponents / totalComponents * 100) : 0
  };
}

function checkMemoryLeaks() {
  console.log('🧠 Checking for potential memory leaks...');
  
  return {
    eventListeners: checkEventListeners(),
    timers: checkTimers(),
    subscriptions: checkSubscriptions()
  };
}

function checkEventListeners() {
  const srcDir = path.join(__dirname, '../src/components');
  let listenerCount = 0;
  let cleanupCount = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        listenerCount += (content.match(/addEventListener/g) || []).length;
        cleanupCount += (content.match(/removeEventListener/g) || []).length;
      }
    }
  }
  
  return {
    added: listenerCount,
    removed: cleanupCount,
    leaks: listenerCount - cleanupCount
  };
}

function checkTimers() {
  const srcDir = path.join(__dirname, '../src/components');
  let timerCount = 0;
  let cleanupCount = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        timerCount += (content.match(/setInterval|setTimeout/g) || []).length;
        cleanupCount += (content.match(/clearInterval|clearTimeout/g) || []).length;
      }
    }
  }
  
  return {
    set: timerCount,
    cleared: cleanupCount,
    leaks: timerCount - cleanupCount
  };
}

function checkSubscriptions() {
  const srcDir = path.join(__dirname, '../src/components');
  let subscriptionCount = 0;
  let cleanupCount = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        subscriptionCount += (content.match(/subscribe|\.subscribe\(/g) || []).length;
        cleanupCount += (content.match(/unsubscribe|\.unsubscribe\(/g) || []).length;
      }
    }
  }
  
  return {
    created: subscriptionCount,
    cleaned: cleanupCount,
    leaks: subscriptionCount - cleanupCount
  };
}

function testAnimationPerformance() {
  console.log('🎬 Testing animation performance...');
  
  return {
    reanimatedComponents: countReanimatedComponents(),
    gestureHandlers: countGestureHandlers(),
    performanceIssues: checkAnimationIssues()
  };
}

function countReanimatedComponents() {
  const srcDir = path.join(__dirname, '../src/components');
  let count = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        count += (content.match(/useAnimated|useSharedValue|useDerivedValue/g) || []).length;
      }
    }
  }
  
  return count;
}

function countGestureHandlers() {
  const srcDir = path.join(__dirname, '../src/components');
  let count = 0;
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        count += (content.match(/PanGestureHandler|TapGestureHandler|GestureDetector/g) || []).length;
      }
    }
  }
  
  return count;
}

function checkAnimationIssues() {
  const issues = [];
  
  // Check for common animation performance issues
  const srcDir = path.join(__dirname, '../src/components');
  
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/)) {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for layout animations on main thread
        if (content.includes('LayoutAnimation') && !content.includes('useNativeDriver')) {
          issues.push({
            component: file,
            issue: 'LayoutAnimation without native driver',
            recommendation: 'Use Reanimated with native driver'
          });
        }
      }
    }
  }
  
  return issues;
}

function evaluateRNPerformance(metrics) {
  console.log('📈 Evaluating RN performance...');
  
  const issues = [];
  
  // Check component performance
  const complexComponents = metrics.componentPerformance.filter(c => c.complexity > 10);
  if (complexComponents.length > 0) {
    issues.push({
      type: 'Component Complexity',
      count: complexComponents.length,
      recommendation: 'Consider breaking down complex components'
    });
  }
  
  // Check memory leaks
  const totalLeaks = metrics.memoryLeaks.eventListeners.leaks + 
                    metrics.memoryLeaks.timers.leaks + 
                    metrics.memoryLeaks.subscriptions.leaks;
  
  if (totalLeaks > 0) {
    issues.push({
      type: 'Memory Leaks',
      count: totalLeaks,
      recommendation: 'Ensure proper cleanup in useEffect'
    });
  }
  
  // Check memoization
  if (metrics.renderPerformance.memoization.percentage < 50) {
    issues.push({
      type: 'Memoization',
      percentage: metrics.renderPerformance.memoization.percentage,
      recommendation: 'Consider memoizing more components'
    });
  }
  
  if (issues.length > 0) {
    console.log(`⚠️ Found ${issues.length} RN performance issue(s):`);
    issues.forEach(issue => {
      console.log(`  ${issue.type}: ${issue.count || issue.percentage}%`);
      console.log(`  💡 ${issue.recommendation}`);
    });
  } else {
    console.log('✅ RN performance looks good!');
  }
  
  // Save issues for CI
  fs.writeFileSync(
    path.join(__dirname, '../rn-performance-issues.json'),
    JSON.stringify(issues, null, 2)
  );
}

// Run RN performance test
testRNPerformance().catch(console.error);
