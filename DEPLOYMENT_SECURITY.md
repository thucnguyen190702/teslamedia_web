# Deployment Security Guide - Tesla Media Clone

## Overview

This guide provides security recommendations for deploying the Tesla Media Clone website in production environments.

## Pre-Deployment Security Checklist

### 1. Code Security Review
- [ ] Run `node security-audit.js` to check for vulnerabilities
- [ ] Verify all user inputs are validated and sanitized
- [ ] Ensure no hardcoded secrets or API keys in code
- [ ] Check that all `dangerouslySetInnerHTML` usage is properly sanitized
- [ ] Verify CSP headers are configured correctly
- [ ] Test all forms with malicious input attempts

### 2. Dependency Security
- [ ] Run `npm audit` and fix any high/critical vulnerabilities
- [ ] Update all dependencies to latest stable versions
- [ ] Remove any unused dependencies
- [ ] Verify no development dependencies in production build

### 3. Build Security
- [ ] Ensure production build removes development code
- [ ] Verify source maps are not exposed in production
- [ ] Check that console.log statements are removed/minimized
- [ ] Confirm environment variables are properly configured

## HTTPS Configuration

### SSL/TLS Certificate
```nginx
# Nginx configuration example
server {
    listen 443 ssl http2;
    server_name teslamedia.example.com;
    
    # SSL Certificate
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Security Headers (additional to Next.js headers)
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Static file serving
    location / {
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name teslamedia.example.com;
    return 301 https://$server_name$request_uri;
}
```

### Apache Configuration
```apache
<VirtualHost *:443>
    ServerName teslamedia.example.com
    DocumentRoot /var/www/tesla-media
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512
    
    # Security Headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Cache Control
    <LocationMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, immutable"
    </LocationMatch>
</VirtualHost>

# HTTP to HTTPS redirect
<VirtualHost *:80>
    ServerName teslamedia.example.com
    Redirect permanent / https://teslamedia.example.com/
</VirtualHost>
```

## CDN and DDoS Protection

### Cloudflare Configuration
1. **SSL/TLS Settings**
   - Set SSL/TLS encryption mode to "Full (strict)"
   - Enable "Always Use HTTPS"
   - Enable "HTTP Strict Transport Security (HSTS)"
   - Set minimum TLS version to 1.2

2. **Security Settings**
   - Enable "Bot Fight Mode"
   - Set Security Level to "Medium" or "High"
   - Enable "Challenge Passage" for suspicious requests
   - Configure rate limiting rules

3. **Firewall Rules**
   ```
   # Block common attack patterns
   (http.request.uri.path contains "wp-admin") or
   (http.request.uri.path contains "phpmyadmin") or
   (http.request.uri.path contains ".env") or
   (http.request.uri.path contains "config.php")
   Action: Block
   
   # Rate limiting for forms
   (http.request.uri.path eq "/lien-he" and http.request.method eq "POST")
   Action: Rate Limit (5 requests per minute)
   ```

4. **Page Rules**
   ```
   # Cache static assets
   teslamedia.example.com/*.js
   teslamedia.example.com/*.css
   teslamedia.example.com/*.png
   teslamedia.example.com/*.jpg
   Cache Level: Cache Everything
   Edge Cache TTL: 1 year
   
   # Cache HTML pages
   teslamedia.example.com/*
   Cache Level: Cache Everything
   Edge Cache TTL: 2 hours
   ```

## Environment Variables

### Production Environment Variables
```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://teslamedia.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTLINE=0901234567
NEXT_PUBLIC_EMAIL=info@teslamedia.example.com

# Security
SECURITY_HEADERS_ENABLED=true
CSP_REPORT_URI=https://teslamedia.example.com/api/csp-report

# Optional: External services
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Secure Environment Variable Management
- Use hosting platform's environment variable system
- Never commit `.env` files to version control
- Rotate API keys regularly
- Use different keys for staging and production
- Implement key rotation procedures

## Monitoring and Alerting

### Security Monitoring
1. **Web Application Firewall (WAF) Logs**
   - Monitor blocked requests
   - Alert on unusual attack patterns
   - Track geographic distribution of attacks

2. **SSL Certificate Monitoring**
   - Set up alerts for certificate expiration (30 days before)
   - Monitor certificate chain validity
   - Check for certificate transparency logs

3. **Performance and Availability**
   - Monitor Core Web Vitals
   - Set up uptime monitoring
   - Track error rates and response times

### Log Analysis
```bash
# Example log analysis commands
# Check for suspicious requests
grep -E "(SELECT|UNION|DROP|INSERT)" /var/log/nginx/access.log

# Monitor failed requests
awk '$9 >= 400 {print $0}' /var/log/nginx/access.log

# Check for bot activity
grep -E "(bot|crawler|spider)" /var/log/nginx/access.log
```

## Backup and Recovery

### Backup Strategy
1. **Code Repository**
   - Use Git with remote repositories
   - Tag releases for easy rollback
   - Maintain staging and production branches

2. **Static Assets**
   - Regular backup of uploaded images/files
   - Version control for content changes
   - CDN backup configuration

3. **Configuration**
   - Backup server configurations
   - Document deployment procedures
   - Maintain infrastructure as code

### Disaster Recovery Plan
1. **Incident Response**
   - Define roles and responsibilities
   - Create communication plan
   - Document escalation procedures

2. **Recovery Procedures**
   - Test backup restoration regularly
   - Maintain recovery time objectives (RTO)
   - Document rollback procedures

## Security Testing

### Automated Security Testing
```bash
# Security testing commands
# SSL/TLS testing
nmap --script ssl-enum-ciphers -p 443 teslamedia.example.com

# HTTP security headers
curl -I https://teslamedia.example.com

# OWASP ZAP automated scan
zap-baseline.py -t https://teslamedia.example.com
```

### Manual Security Testing
1. **Input Validation Testing**
   - Test all forms with malicious input
   - Check for XSS vulnerabilities
   - Verify CSRF protection

2. **Authentication Testing**
   - Test session management
   - Check for privilege escalation
   - Verify logout functionality

3. **Infrastructure Testing**
   - Port scanning
   - SSL/TLS configuration testing
   - HTTP security headers validation

## Compliance and Legal

### Data Protection
- Implement privacy policy
- Configure cookie consent (if using tracking)
- Ensure GDPR compliance for EU visitors
- Document data processing activities

### Vietnamese Regulations
- Comply with Vietnamese cybersecurity law
- Register domain with Vietnamese authorities if required
- Implement required legal notices
- Ensure content complies with local regulations

## Incident Response Plan

### Security Incident Classification
1. **Low**: Minor security issues, no data exposure
2. **Medium**: Potential security vulnerabilities, limited impact
3. **High**: Active security breach, data potentially compromised
4. **Critical**: Major security breach, significant data exposure

### Response Procedures
1. **Detection and Analysis**
   - Monitor security alerts
   - Analyze incident scope and impact
   - Document all findings

2. **Containment and Eradication**
   - Isolate affected systems
   - Remove malicious content
   - Patch vulnerabilities

3. **Recovery and Lessons Learned**
   - Restore normal operations
   - Monitor for recurring issues
   - Update security procedures

## Regular Security Maintenance

### Weekly Tasks
- [ ] Review security logs
- [ ] Check for dependency updates
- [ ] Monitor SSL certificate status
- [ ] Review failed login attempts

### Monthly Tasks
- [ ] Run comprehensive security scan
- [ ] Update security documentation
- [ ] Review access controls
- [ ] Test backup procedures

### Quarterly Tasks
- [ ] Conduct penetration testing
- [ ] Review and update security policies
- [ ] Security awareness training
- [ ] Disaster recovery testing

### Annual Tasks
- [ ] Comprehensive security audit
- [ ] Update incident response plan
- [ ] Review and renew SSL certificates
- [ ] Security architecture review

---

**Important**: This guide provides general security recommendations. Always consult with security professionals for specific deployment environments and compliance requirements.

**Last Updated**: December 2024  
**Next Review**: March 2025