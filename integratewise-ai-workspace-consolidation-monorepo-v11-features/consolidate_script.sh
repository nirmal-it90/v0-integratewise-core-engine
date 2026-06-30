#!/bin/bash
set -e

BASE_DIR="/Users/nirmal/Github/13.1"
NEW_DIR="$BASE_DIR/integratewise-os-consolidated"
SOURCE1="$BASE_DIR/integrationwise-os"
SOURCE2="$BASE_DIR/apps/integrationwise-os"

echo "=== CONSOLIDATION SCRIPT ==="
echo "Source 1: $SOURCE1"
echo "Source 2: $SOURCE2"
echo "Target: $NEW_DIR"
echo ""

# Create directory structure
mkdir -p "$NEW_DIR"/{app,components,lib,hooks,public,scripts,styles}

echo "✅ Directory structure created"
