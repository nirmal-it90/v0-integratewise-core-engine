#!/bin/bash

###############################################################################
# System Audit Runner
# 
# Runs comprehensive Playwright audits and generates reports
###############################################################################

set -e

OUTPUT_DIR="audit-results"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="$OUTPUT_DIR/system-audit-report-$TIMESTAMP.md"

log() {
    echo -e "\033[0;32m[$(date +'%H:%M:%S')]\033[0m $1"
}

info() {
    echo -e "\033[0;34m[INFO]\033[0m $1"
}

mkdir -p "$OUTPUT_DIR"

log "Starting comprehensive system audit..."

# Check if Playwright is installed
if ! npx playwright --version &>/dev/null; then
    info "Installing Playwright..."
    npx playwright install --with-deps chromium
fi

# Run audit tests
log "Running system audit tests..."

# Run all audit tests
npx playwright test \
  e2e/system-audit.spec.ts \
  e2e/api-audit.spec.ts \
  e2e/page-audit.spec.ts \
  --reporter=html,json,list \
  --output-dir="$OUTPUT_DIR/test-results" \
  2>&1 | tee "$OUTPUT_DIR/audit-output-$TIMESTAMP.log"

AUDIT_EXIT_CODE=${PIPESTATUS[0]}

# Generate report
log "Generating audit report..."

cat > "$REPORT_FILE" << EOF
# System Audit Report

**Generated:** $(date)
**Test Suite:** Comprehensive System Audit
**Base URL:** ${TEST_BASE_URL:-http://localhost:3333}

---

## Summary

This report contains the results of comprehensive system auditing using Playwright.

---

## Test Execution

- **Exit Code:** $AUDIT_EXIT_CODE
- **Report Location:** $OUTPUT_DIR/
- **HTML Report:** playwright-report/index.html

---

## Audit Coverage

### 1. System Audit (e2e/system-audit.spec.ts)
- Core pages loading
- API endpoint accessibility
- Navigation and routing
- Error handling
- Performance metrics
- Accessibility checks
- Critical functionality

### 2. API Audit (e2e/api-audit.spec.ts)
- Health & status endpoints
- Core functionality APIs
- Webhook endpoints
- Error handling
- Response times

### 3. Page Audit (e2e/page-audit.spec.ts)
- Public pages
- Application pages
- Business pages
- CS pages
- Admin pages
- Special features

---

## Next Steps

1. Review HTML report: \`npx playwright show-report\`
2. Check JSON results: \`$OUTPUT_DIR/test-results/results.json\`
3. Review console output: \`$OUTPUT_DIR/audit-output-$TIMESTAMP.log\`

---

**Report Generated:** $(date)
EOF

log "Audit complete!"
info "Report saved to: $REPORT_FILE"
info "View HTML report: npx playwright show-report"

exit $AUDIT_EXIT_CODE
