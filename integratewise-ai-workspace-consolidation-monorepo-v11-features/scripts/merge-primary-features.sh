#!/bin/bash
# Merge PRIMARY v11.0 features from integrate-wise-operating-syst-2 into monorepo

set -e

SOURCE_DIR="/Users/nirmal/Github/13.1/integrate-wise-operating-syst-2"
TARGET_DIR="/Users/nirmal/Github/13.1/integratewise-ai-workspace/apps/integrationwise-os"

echo "🚀 Starting PRIMARY v11.0 feature merge..."

# Create directories if they don't exist
mkdir -p "$TARGET_DIR/app/today"
mkdir -p "$TARGET_DIR/app/cockpit"
mkdir -p "$TARGET_DIR/app/governance"
mkdir -p "$TARGET_DIR/app/release-control"
mkdir -p "$TARGET_DIR/app/architecture"
mkdir -p "$TARGET_DIR/app/data-flow"
mkdir -p "$TARGET_DIR/app/cs/accounts"
mkdir -p "$TARGET_DIR/app/cs/contacts"
mkdir -p "$TARGET_DIR/app/cs/meetings"
mkdir -p "$TARGET_DIR/app/iq-hub"
mkdir -p "$TARGET_DIR/app/onboarding/persona-analysis"
mkdir -p "$TARGET_DIR/app/onboarding/persona-insights"
mkdir -p "$TARGET_DIR/app/onboarding/load-data"
mkdir -p "$TARGET_DIR/app/onboarding/processing"

# Copy routes
echo "📄 Copying routes..."
cp "$SOURCE_DIR/app/today/page.tsx" "$TARGET_DIR/app/today/page.tsx" 2>/dev/null || echo "⚠️  today/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/cockpit/page.tsx" "$TARGET_DIR/app/cockpit/page.tsx" 2>/dev/null || echo "⚠️  cockpit/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/governance/page.tsx" "$TARGET_DIR/app/governance/page.tsx" 2>/dev/null || echo "⚠️  governance/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/release-control/page.tsx" "$TARGET_DIR/app/release-control/page.tsx" 2>/dev/null || echo "⚠️  release-control/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/architecture/page.tsx" "$TARGET_DIR/app/architecture/page.tsx" 2>/dev/null || echo "⚠️  architecture/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/data-flow/page.tsx" "$TARGET_DIR/app/data-flow/page.tsx" 2>/dev/null || echo "⚠️  data-flow/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/cs/accounts/page.tsx" "$TARGET_DIR/app/cs/accounts/page.tsx" 2>/dev/null || echo "⚠️  cs/accounts/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/cs/contacts/page.tsx" "$TARGET_DIR/app/cs/contacts/page.tsx" 2>/dev/null || echo "⚠️  cs/contacts/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/cs/meetings/page.tsx" "$TARGET_DIR/app/cs/meetings/page.tsx" 2>/dev/null || echo "⚠️  cs/meetings/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/iq-hub/page.tsx" "$TARGET_DIR/app/iq-hub/page.tsx" 2>/dev/null || echo "⚠️  iq-hub/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/onboarding/persona-analysis/page.tsx" "$TARGET_DIR/app/onboarding/persona-analysis/page.tsx" 2>/dev/null || echo "⚠️  onboarding/persona-analysis/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/onboarding/persona-insights/page.tsx" "$TARGET_DIR/app/onboarding/persona-insights/page.tsx" 2>/dev/null || echo "⚠️  onboarding/persona-insights/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/onboarding/load-data/page.tsx" "$TARGET_DIR/app/onboarding/load-data/page.tsx" 2>/dev/null || echo "⚠️  onboarding/load-data/page.tsx already exists or not found"
cp "$SOURCE_DIR/app/onboarding/processing/page.tsx" "$TARGET_DIR/app/onboarding/processing/page.tsx" 2>/dev/null || echo "⚠️  onboarding/processing/page.tsx already exists or not found"

# Copy components
echo "🧩 Copying components..."
mkdir -p "$TARGET_DIR/components/onboarding"
mkdir -p "$TARGET_DIR/components/layouts"
mkdir -p "$TARGET_DIR/components/rbac"
mkdir -p "$TARGET_DIR/components/department"
mkdir -p "$TARGET_DIR/components/views"

cp -r "$SOURCE_DIR/components/onboarding/"* "$TARGET_DIR/components/onboarding/" 2>/dev/null || echo "⚠️  onboarding components already exist"
cp -r "$SOURCE_DIR/components/layouts/"* "$TARGET_DIR/components/layouts/" 2>/dev/null || echo "⚠️  layout components already exist"
cp -r "$SOURCE_DIR/components/rbac/"* "$TARGET_DIR/components/rbac/" 2>/dev/null || echo "⚠️  rbac components already exist"
cp -r "$SOURCE_DIR/components/department/"* "$TARGET_DIR/components/department/" 2>/dev/null || echo "⚠️  department components already exist"

# Copy specific view components
cp "$SOURCE_DIR/components/views/cockpit-view.tsx" "$TARGET_DIR/components/views/cockpit-view.tsx" 2>/dev/null || echo "⚠️  cockpit-view.tsx already exists"
cp "$SOURCE_DIR/components/views/release-control-view.tsx" "$TARGET_DIR/components/views/release-control-view.tsx" 2>/dev/null || echo "⚠️  release-control-view.tsx already exists"
cp "$SOURCE_DIR/components/views/architecture-view.tsx" "$TARGET_DIR/components/views/architecture-view.tsx" 2>/dev/null || echo "⚠️  architecture-view.tsx already exists"
cp "$SOURCE_DIR/components/views/data-flow-view.tsx" "$TARGET_DIR/components/views/data-flow-view.tsx" 2>/dev/null || echo "⚠️  data-flow-view.tsx already exists"
cp "$SOURCE_DIR/components/views/cs-accounts-view.tsx" "$TARGET_DIR/components/views/cs-accounts-view.tsx" 2>/dev/null || echo "⚠️  cs-accounts-view.tsx already exists"
cp "$SOURCE_DIR/components/views/cs-contacts-view.tsx" "$TARGET_DIR/components/views/cs-contacts-view.tsx" 2>/dev/null || echo "⚠️  cs-contacts-view.tsx already exists"
cp "$SOURCE_DIR/components/views/cs-meetings-view.tsx" "$TARGET_DIR/components/views/cs-meetings-view.tsx" 2>/dev/null || echo "⚠️  cs-meetings-view.tsx already exists"
cp "$SOURCE_DIR/components/views/cs-account-detail-view.tsx" "$TARGET_DIR/components/views/cs-account-detail-view.tsx" 2>/dev/null || echo "⚠️  cs-account-detail-view.tsx already exists"
cp "$SOURCE_DIR/components/views/iq-hub-view.tsx" "$TARGET_DIR/components/views/iq-hub-view.tsx" 2>/dev/null || echo "⚠️  iq-hub-view.tsx already exists"
cp "$SOURCE_DIR/components/views/governance-view.tsx" "$TARGET_DIR/components/views/governance-view.tsx" 2>/dev/null || echo "⚠️  governance-view.tsx already exists"
cp "$SOURCE_DIR/components/views/today-view.tsx" "$TARGET_DIR/components/views/today-view.tsx" 2>/dev/null || echo "⚠️  today-view.tsx already exists"

# Copy other components
cp "$SOURCE_DIR/components/cognitive-twin-chat.tsx" "$TARGET_DIR/components/cognitive-twin-chat.tsx" 2>/dev/null || echo "⚠️  cognitive-twin-chat.tsx already exists"
cp "$SOURCE_DIR/components/enterprise-app-shell.tsx" "$TARGET_DIR/components/enterprise-app-shell.tsx" 2>/dev/null || echo "⚠️  enterprise-app-shell.tsx already exists"
cp "$SOURCE_DIR/components/enterprise-footer.tsx" "$TARGET_DIR/components/enterprise-footer.tsx" 2>/dev/null || echo "⚠️  enterprise-footer.tsx already exists"
cp "$SOURCE_DIR/components/enhanced-sidebar.tsx" "$TARGET_DIR/components/enhanced-sidebar.tsx" 2>/dev/null || echo "⚠️  enhanced-sidebar.tsx already exists"
cp "$SOURCE_DIR/components/enhanced-header.tsx" "$TARGET_DIR/components/enhanced-header.tsx" 2>/dev/null || echo "⚠️  enhanced-header.tsx already exists"
cp "$SOURCE_DIR/components/enhanced-user-menu.tsx" "$TARGET_DIR/components/enhanced-user-menu.tsx" 2>/dev/null || echo "⚠️  enhanced-user-menu.tsx already exists"
cp "$SOURCE_DIR/components/theme-switcher.tsx" "$TARGET_DIR/components/theme-switcher.tsx" 2>/dev/null || echo "⚠️  theme-switcher.tsx already exists"

# Copy libraries
echo "📚 Copying libraries..."
mkdir -p "$TARGET_DIR/lib/rbac"
mkdir -p "$TARGET_DIR/lib/department"
mkdir -p "$TARGET_DIR/lib/hooks"

cp "$SOURCE_DIR/lib/rbac/types.ts" "$TARGET_DIR/lib/rbac/types.ts" 2>/dev/null || echo "⚠️  rbac/types.ts already exists"
cp "$SOURCE_DIR/lib/rbac/context.tsx" "$TARGET_DIR/lib/rbac/context.tsx" 2>/dev/null || echo "⚠️  rbac/context.tsx already exists"
cp "$SOURCE_DIR/lib/department/context.tsx" "$TARGET_DIR/lib/department/context.tsx" 2>/dev/null || echo "⚠️  department/context.tsx already exists"
cp "$SOURCE_DIR/lib/design-tokens.ts" "$TARGET_DIR/lib/design-tokens.ts" 2>/dev/null || echo "⚠️  design-tokens.ts already exists"
cp "$SOURCE_DIR/lib/hooks/use-cs-data.ts" "$TARGET_DIR/lib/hooks/use-cs-data.ts" 2>/dev/null || echo "⚠️  use-cs-data.ts already exists"

# Update root layout to include RBAC and Department providers
echo "🔧 Updating root layout..."
if [ -f "$TARGET_DIR/app/layout.tsx" ]; then
    # Check if RBACProvider is already included
    if ! grep -q "RBACProvider" "$TARGET_DIR/app/layout.tsx"; then
        echo "⚠️  Need to manually add RBACProvider to layout.tsx"
    fi
fi

echo "✅ PRIMARY v11.0 features merge complete!"
echo "📝 Next steps:"
echo "   1. Review and fix import paths"
echo "   2. Update root layout.tsx to include RBAC + Department providers"
echo "   3. Test builds"
echo "   4. Resolve any conflicts"
