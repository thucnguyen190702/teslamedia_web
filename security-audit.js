#!/usr/bin/env node

/**
 * Security Audit Script
 * Tesla Media Clone Website
 * 
 * Manual security audit script to check for common vulnerabilities
 * Run with: node security-audit.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 Tesla Media Clone - Security Audit');
console.log('=====================================\n');

// Check package.json for known vulnerable packages
function checkPackageJson() {
  console.log('📦 Checking package.json dependencies...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Known vulnerable packages to check for
    const knownVulnerablePackages = [
      'lodash', // Check for old versions
      'moment', // Deprecated, should use date-fns or dayjs
      'request', // Deprecated
      'node-sass', // Should use sass
      'babel-core', // Old babel versions
    ];
    
    let vulnerableFound = false;
    
    for (const [pkg, version] of Object.entries(dependencies)) {
      if (knownVulnerablePackages.includes(pkg)) {
        console.log(`⚠️  Warning: ${pkg}@${version} may have known vulnerabilities`);
        vulnerableFound = true;
      }
    }
    
    if (!vulnerableFound) {
      console.log('✅ No known vulnerable packages found');
    }
    
    // Check for outdated Next.js version
    if (dependencies.next) {
      const nextVersion = dependencies.next.replace(/[\^~]/, '');
      const majorVersion = parseInt(nextVersion.split('.')[0]);
      if (majorVersion < 14) {
        console.log(`⚠️  Warning: Next.js version ${nextVersion} is outdated. Consider upgrading to 14+`);
      } else {
        console.log('✅ Next.js version is up to date');
      }
    }
    
    // Check for React version
    if (dependencies.react) {
      const reactVersion = dependencies.react.replace(/[\^~]/, '');
      const majorVersion = parseInt(reactVersion.split('.')[0]);
      if (majorVersion < 18) {
        console.log(`⚠️  Warning: React version ${reactVersion} is outdated. Consider upgrading to 18+`);
      } else {
        console.log('✅ React version is up to date');
      }
    }
    
  } catch (error) {
    console.log('❌ Error reading package.json:', error.message);
  }
  
  console.log('');
}

// Check for hardcoded secrets or sensitive data
function checkForSecrets() {
  console.log('🔍 Scanning for hardcoded secrets...');
  
  const secretPatterns = [
    /api[_-]?key[_-]?=.+/gi,
    /secret[_-]?key[_-]?=.+/gi,
    /password[_-]?=.+/gi,
    /token[_-]?=.+/gi,
    /auth[_-]?token[_-]?=.+/gi,
    /access[_-]?token[_-]?=.+/gi,
    /private[_-]?key[_-]?=.+/gi,
    /database[_-]?url[_-]?=.+/gi,
    /mongodb[_-]?uri[_-]?=.+/gi,
    /mysql[_-]?password[_-]?=.+/gi,
  ];
  
  const filesToCheck = [
    'next.config.js',
    'tailwind.config.ts',
    '.env',
    '.env.local',
    '.env.production',
  ];
  
  let secretsFound = false;
  
  filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        secretPatterns.forEach(pattern => {
          const matches = content.match(pattern);
          if (matches) {
            console.log(`⚠️  Potential secret found in ${file}: ${matches[0].substring(0, 50)}...`);
            secretsFound = true;
          }
        });
      } catch (error) {
        console.log(`❌ Error reading ${file}:`, error.message);
      }
    }
  });
  
  if (!secretsFound) {
    console.log('✅ No hardcoded secrets detected');
  }
  
  console.log('');
}

// Check security headers in next.config.js
function checkSecurityHeaders() {
  console.log('🛡️  Checking security headers configuration...');
  
  try {
    const nextConfigContent = fs.readFileSync('next.config.js', 'utf8');
    
    const requiredHeaders = [
      'Content-Security-Policy',
      'Strict-Transport-Security',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Referrer-Policy'
    ];
    
    let allHeadersPresent = true;
    
    requiredHeaders.forEach(header => {
      if (!nextConfigContent.includes(header)) {
        console.log(`⚠️  Missing security header: ${header}`);
        allHeadersPresent = false;
      }
    });
    
    if (allHeadersPresent) {
      console.log('✅ All required security headers are configured');
    }
    
    // Check for CSP configuration
    if (nextConfigContent.includes('Content-Security-Policy')) {
      console.log('✅ Content Security Policy is configured');
      
      // Check for unsafe-inline and unsafe-eval
      if (nextConfigContent.includes("'unsafe-inline'")) {
        console.log('⚠️  Warning: CSP allows unsafe-inline scripts/styles');
      }
      if (nextConfigContent.includes("'unsafe-eval'")) {
        console.log('⚠️  Warning: CSP allows unsafe-eval (required for Next.js dev mode)');
      }
    }
    
  } catch (error) {
    console.log('❌ Error reading next.config.js:', error.message);
  }
  
  console.log('');
}

// Check for input validation in components
function checkInputValidation() {
  console.log('🔒 Checking input validation...');
  
  const componentDirs = ['components', 'app'];
  let validationFound = false;
  let inputsWithoutValidation = [];
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          // Check for input elements
          const inputMatches = content.match(/<input[^>]*>/g);
          const textareaMatches = content.match(/<textarea[^>]*>/g);
          const selectMatches = content.match(/<select[^>]*>/g);
          
          const allInputs = [...(inputMatches || []), ...(textareaMatches || []), ...(selectMatches || [])];
          
          if (allInputs.length > 0) {
            // Check for validation
            const hasZodValidation = content.includes('zod') || content.includes('zodResolver');
            const hasReactHookForm = content.includes('useForm') || content.includes('react-hook-form');
            const hasBasicValidation = content.includes('required') || content.includes('pattern') || content.includes('maxLength');
            
            if (hasZodValidation || hasReactHookForm || hasBasicValidation) {
              validationFound = true;
              console.log(`✅ Input validation found in ${fullPath}`);
            } else {
              inputsWithoutValidation.push(fullPath);
            }
          }
        } catch (error) {
          // Skip files that can't be read
        }
      }
    });
  }
  
  componentDirs.forEach(scanDirectory);
  
  if (inputsWithoutValidation.length > 0) {
    console.log('⚠️  Files with inputs that may need validation:');
    inputsWithoutValidation.forEach(file => {
      console.log(`   - ${file}`);
    });
  }
  
  if (validationFound) {
    console.log('✅ Input validation is implemented');
  }
  
  console.log('');
}

// Check for XSS vulnerabilities
function checkXSSVulnerabilities() {
  console.log('🚨 Checking for potential XSS vulnerabilities...');
  
  const componentDirs = ['components', 'app'];
  let xssVulnerabilities = [];
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          // Check for dangerouslySetInnerHTML
          const dangerousMatches = content.match(/dangerouslySetInnerHTML/g);
          if (dangerousMatches) {
            // Check if it's properly sanitized
            const lines = content.split('\n');
            lines.forEach((line, index) => {
              if (line.includes('dangerouslySetInnerHTML')) {
                // Check if sanitization is mentioned nearby
                const contextLines = lines.slice(Math.max(0, index - 3), index + 3).join(' ');
                if (!contextLines.includes('sanitize') && !contextLines.includes('escape') && !contextLines.includes('DOMPurify')) {
                  xssVulnerabilities.push({
                    file: fullPath,
                    line: index + 1,
                    issue: 'dangerouslySetInnerHTML without apparent sanitization'
                  });
                }
              }
            });
          }
          
          // Check for direct innerHTML usage (less common in React)
          if (content.includes('.innerHTML')) {
            xssVulnerabilities.push({
              file: fullPath,
              issue: 'Direct innerHTML usage detected'
            });
          }
          
        } catch (error) {
          // Skip files that can't be read
        }
      }
    });
  }
  
  componentDirs.forEach(scanDirectory);
  
  if (xssVulnerabilities.length > 0) {
    console.log('⚠️  Potential XSS vulnerabilities found:');
    xssVulnerabilities.forEach(vuln => {
      console.log(`   - ${vuln.file}${vuln.line ? `:${vuln.line}` : ''} - ${vuln.issue}`);
    });
  } else {
    console.log('✅ No obvious XSS vulnerabilities detected');
  }
  
  console.log('');
}

// Check for HTTPS enforcement
function checkHTTPSEnforcement() {
  console.log('🔐 Checking HTTPS enforcement...');
  
  try {
    const nextConfigContent = fs.readFileSync('next.config.js', 'utf8');
    
    if (nextConfigContent.includes('Strict-Transport-Security')) {
      console.log('✅ HSTS header is configured');
    } else {
      console.log('⚠️  HSTS header not found in next.config.js');
    }
    
    if (nextConfigContent.includes('upgrade-insecure-requests')) {
      console.log('✅ CSP upgrade-insecure-requests directive found');
    } else {
      console.log('⚠️  CSP upgrade-insecure-requests directive not found');
    }
    
  } catch (error) {
    console.log('❌ Error checking HTTPS enforcement:', error.message);
  }
  
  console.log('');
}

// Main audit function
function runSecurityAudit() {
  console.log('Starting security audit...\n');
  
  checkPackageJson();
  checkForSecrets();
  checkSecurityHeaders();
  checkInputValidation();
  checkXSSVulnerabilities();
  checkHTTPSEnforcement();
  
  console.log('🏁 Security audit completed!');
  console.log('\nRecommendations:');
  console.log('1. Run "npm audit" regularly to check for dependency vulnerabilities');
  console.log('2. Keep all dependencies up to date');
  console.log('3. Never commit secrets or API keys to version control');
  console.log('4. Use environment variables for sensitive configuration');
  console.log('5. Implement proper input validation and sanitization');
  console.log('6. Test security headers with online tools like securityheaders.com');
  console.log('7. Consider using a security scanner like OWASP ZAP for deeper analysis');
  console.log('\nFor production deployment:');
  console.log('- Enable HTTPS with valid SSL certificate');
  console.log('- Configure CDN with DDoS protection');
  console.log('- Set up monitoring and alerting');
  console.log('- Regular security assessments');
}

// Run the audit
runSecurityAudit();