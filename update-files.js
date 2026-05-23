#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const srcPath = process.cwd();

// Define file replacements
const replacements = [
    { from: 'src/db/index_new.ts', to: 'src/db/index.ts' },
    { from: 'src/middleware/auth_v2.ts', to: 'src/middleware/auth.ts' },
    { from: 'src/middleware/logger_fixed.ts', to: 'src/middleware/logger.ts' },
    { from: 'src/modules/user/user.service_v2.ts', to: 'src/modules/user/user.service.ts' },
    { from: 'src/modules/user/user.controller_v2.ts', to: 'src/modules/user/user.controller.ts' },
    { from: 'src/modules/user/user.route_v2.ts', to: 'src/modules/user/user.route.ts' },
    { from: 'src/modules/auth/auth.service_v2.ts', to: 'src/modules/auth/auth.service.ts' },
    { from: 'src/modules/auth/auth.controller_v2.ts', to: 'src/modules/auth/auth.controller.ts' },
    { from: 'src/modules/auth/auth.route_v2.ts', to: 'src/modules/auth/auth.route.ts' },
    { from: 'src/modules/issues/issue.service_v2.ts', to: 'src/modules/issues/issue.service.ts' },
    { from: 'src/modules/issues/issue.controller_v2.ts', to: 'src/modules/issues/issue.controller.ts' },
    { from: 'src/modules/issues/issue.route_v2.ts', to: 'src/modules/issues/issue.route.ts' },
    { from: 'src/app_v2.ts', to: 'src/app.ts' },
];

console.log('🔄 Updating files...\n');

replacements.forEach(({ from, to }) => {
    const fromPath = path.join(srcPath, from);
    const toPath = path.join(srcPath, to);
    
    if (fs.existsSync(fromPath)) {
        fs.copyFileSync(fromPath, toPath);
        console.log(`✅ Updated: ${to}`);
    } else {
        console.log(`⚠️  Source not found: ${from}`);
    }
});

// Clean up old fixed files
const toDelete = [
    'src/middleware/auth_fixed.ts',
    'src/middleware/auth_new.ts',
    'src/middleware/logger_fixed.ts',
    'src/modules/issues/issue.service_fixed.ts',
    'src/modules/issues/issue.controller_fixed.ts',
    'src/modules/user/user.controller_fixed.ts',
    'src/modules/auth/auth.controller_fixed.ts',
];

console.log('\n🗑️  Cleaning up temporary files...\n');

toDelete.forEach(file => {
    const filePath = path.join(srcPath, file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`✅ Deleted: ${file}`);
    }
});

console.log('\n✨ All files updated successfully!');
console.log('Run: npm install && npm run dev');
