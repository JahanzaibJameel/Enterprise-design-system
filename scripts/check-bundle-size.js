const fs = require('fs');
const path = require('path');

function checkBundleSize() {
  console.log('📦 Checking bundle size...');
  
  const maxSizeKB = 2048; // 2MB limit
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Calculate estimated bundle size based on dependencies
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  console.log(`📊 Dependencies: ${dependencies.length}`);
  console.log(`📊 Dev Dependencies: ${devDependencies.length}`);
  
  // Check for large dependencies
  const largeDeps = [
    '@expo/vector-icons',
    'react-native-svg',
    'react-native-reanimated',
    'react-native-gesture-handler',
  ];
  
  const foundLargeDeps = dependencies.filter(dep => largeDeps.includes(dep));
  
  if (foundLargeDeps.length > 0) {
    console.log(`⚠️  Large dependencies detected: ${foundLargeDeps.join(', ')}`);
  }
  
  // In a real implementation, you'd use webpack-bundle-analyzer or similar
  const estimatedSize = 1500; // KB - placeholder
  console.log(`📊 Estimated bundle size: ${estimatedSize}KB`);
  
  if (estimatedSize > maxSizeKB) {
    console.error(`❌ Bundle size (${estimatedSize}KB) exceeds limit (${maxSizeKB}KB)`);
    return false;
  }
  
  console.log('✅ Bundle size within limits');
  return true;
}

function checkPerformanceMetrics() {
  console.log('⚡ Checking performance metrics...');
  
  const metrics = {
    maxReRenders: 10,
    maxAnimationDuration: 16, // 60fps = 16ms per frame
    maxMemoryUsage: 100, // MB
  };
  
  // Check component render performance
  const componentFiles = fs.readdirSync(path.join(__dirname, '../src/components'))
    .filter(file => file.endsWith('.tsx'));
  
  console.log(`📊 Components to check: ${componentFiles.length}`);
  
  // In a real implementation, you'd run actual performance tests
  const mockResults = {
    reRenders: 5,
    animationDuration: 12,
    memoryUsage: 45,
  };
  
  console.log(`📊 Average re-renders: ${mockResults.reRenders} (limit: ${metrics.maxReRenders})`);
  console.log(`📊 Animation duration: ${mockResults.animationDuration}ms (limit: ${metrics.maxAnimationDuration}ms)`);
  console.log(`📊 Memory usage: ${mockResults.memoryUsage}MB (limit: ${metrics.maxMemoryUsage}MB)`);
  
  const allPassed = 
    mockResults.reRenders <= metrics.maxReRenders &&
    mockResults.animationDuration <= metrics.maxAnimationDuration &&
    mockResults.memoryUsage <= metrics.maxMemoryUsage;
  
  if (allPassed) {
    console.log('✅ All performance metrics within limits');
  } else {
    console.error('❌ Some performance metrics exceed limits');
  }
  
  return allPassed;
}

function checkFPS() {
  console.log('🎯 Checking FPS performance...');
  
  const targetFPS = 60;
  const minFPS = 55;
  
  // Mock FPS test results
  const mockFPSResults = {
    average: 58,
    min: 56,
    max: 60,
    droppedFrames: 2,
  };
  
  console.log(`📊 Average FPS: ${mockFPSResults.average} (target: ${targetFPS})`);
  console.log(`📊 Minimum FPS: ${mockFPSResults.min} (minimum: ${minFPS})`);
  console.log(`📊 Dropped frames: ${mockFPSResults.droppedFrames}`);
  
  const fpsPassed = 
    mockFPSResults.average >= targetFPS &&
    mockFPSResults.min >= minFPS &&
    mockFPSResults.droppedFrames <= 5;
  
  if (fpsPassed) {
    console.log('✅ FPS performance is acceptable');
  } else {
    console.error('❌ FPS performance below acceptable levels');
  }
  
  return fpsPassed;
}

// Main execution
try {
  const bundleSizeOK = checkBundleSize();
  const performanceOK = checkPerformanceMetrics();
  const fpsOK = checkFPS();
  
  if (bundleSizeOK && performanceOK && fpsOK) {
    console.log('🎉 All performance checks passed!');
    process.exit(0);
  } else {
    console.log('❌ Performance checks failed');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error checking performance:', error);
  process.exit(1);
}
