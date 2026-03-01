#!/usr/bin/env node

/**
 * 🚀 Automated Git Push & App Launch Script
 * 
 * This script automates the entire deployment process:
 * 1. Initialize Git repository (if not already initialized)
 * 2. Configure Git user (email & name)
 * 3. Add all files to staging
 * 4. Create a commit with a message
 * 5. Push code to GitHub
 * 6. Launch the development server (npm run dev)
 * 
 * Usage:
 *   node deploy.js
 * 
 * Or make it executable:
 *   chmod +x deploy.js
 *   ./deploy.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ========================================
// 🔧 CONFIGURATION - Modify these values
// ========================================

const CONFIG = {
  // Your GitHub username and email
  gitUsername: 'aalj-png',
  gitEmail: 'a.alj@esisa.ac.ma',
  
  // Your GitHub repository URL
  // Format: https://github.com/USERNAME/REPO.git
  githubUrl: 'https://github.com/aalj-png/sm.git',
  
  // Branch name (usually 'main' or 'master')
  branch: 'main',
  
  // Default commit message
  commitMessage: 'Update: Student Management System',
  
  // Frontend directory (for npm run dev)
  frontendDir: './frontend',
};

// ========================================
// 🎨 Colors for console output
// ========================================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60) + '\n');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

// ========================================
// 🔄 Utilities
// ========================================

function runCommand(command, description) {
  try {
    logInfo(`${description}...`);
    execSync(command, { stdio: 'inherit', shell: true });
    logSuccess(description);
    return true;
  } catch (error) {
    logError(`Failed: ${description}`);
    logError(error.message);
    return false;
  }
}

function getChangedFiles() {
  try {
    const output = execSync('git status --porcelain', { encoding: 'utf-8' });
    return output.split('\n').filter(line => line.trim());
  } catch {
    return [];
  }
}

function isGitInitialized() {
  return fs.existsSync(path.join(process.cwd(), '.git'));
}

// ========================================
// 📋 Main Deployment Process
// ========================================

async function deploy() {
  logSection('🚀 STUDENT MANAGEMENT SYSTEM - DEPLOYMENT');

  console.log(`📍 Current directory: ${process.cwd()}\n`);
  logInfo(`Git User: ${CONFIG.gitUsername} (${CONFIG.gitEmail})`);
  logInfo(`Repository: ${CONFIG.githubUrl}`);
  logInfo(`Branch: ${CONFIG.branch}\n`);

  // Step 1: Initialize Git (if needed)
  logSection('STEP 1️⃣ - GIT INITIALIZATION');

  if (!isGitInitialized()) {
    logWarning('Git not initialized. Initializing now...');
    if (!runCommand('git init', 'Initialize Git')) {
      return;
    }
  } else {
    logSuccess('Git repository already initialized');
  }

  // Step 2: Configure Git user
  logSection('STEP 2️⃣ - GIT CONFIGURATION');

  runCommand(
    `git config user.name "${CONFIG.gitUsername}"`,
    `Set Git username to "${CONFIG.gitUsername}"`
  );

  runCommand(
    `git config user.email "${CONFIG.gitEmail}"`,
    `Set Git email to "${CONFIG.gitEmail}"`
  );

  // Step 3: Check for changes
  logSection('STEP 3️⃣ - CHECKING FOR CHANGES');

  const changedFiles = getChangedFiles();
  if (changedFiles.length === 0) {
    logWarning('No changes detected');
  } else {
    logInfo(`Found ${changedFiles.length} changed file(s):`);
    changedFiles.slice(0, 10).forEach(file => {
      console.log(`   ${file}`);
    });
    if (changedFiles.length > 10) {
      console.log(`   ... and ${changedFiles.length - 10} more files`);
    }
  }

  // Step 4: Add all files
  logSection('STEP 4️⃣ - STAGING FILES');

  if (!runCommand('git add .', 'Add all files to staging area')) {
    return;
  }

  // Step 5: Create commit
  logSection('STEP 5️⃣ - CREATING COMMIT');

  const commitMsg = process.argv[2] || CONFIG.commitMessage;
  logInfo(`Commit message: "${commitMsg}"`);

  if (!runCommand(
    `git commit -m "${commitMsg}"`,
    'Create commit'
  )) {
    logWarning('Could not create commit (no changes or already committed)');
  }

  // Step 6: Configure remote
  logSection('STEP 6️⃣ - CONFIGURING REMOTE');

  try {
    const remoteUrl = execSync('git remote get-url origin', {
      encoding: 'utf-8',
    }).trim();
    logSuccess(`Remote already configured: ${remoteUrl}`);
  } catch {
    logWarning('No remote configured. Adding...');
    if (!runCommand(
      `git remote add origin ${CONFIG.githubUrl}`,
      'Add GitHub remote'
    )) {
      return;
    }
  }

  // Step 7: Rename branch (if needed)
  logSection('STEP 7️⃣ - BRANCH SETUP');

  try {
    execSync(`git rev-parse --verify ${CONFIG.branch}`, { stdio: 'ignore' });
    logSuccess(`Branch "${CONFIG.branch}" already exists`);
  } catch {
    logInfo(`Renaming current branch to "${CONFIG.branch}"...`);
    runCommand(
      `git branch -M ${CONFIG.branch}`,
      `Rename branch to "${CONFIG.branch}"`
    );
  }

  // Step 8: Push to GitHub
  logSection('STEP 8️⃣ - PUSHING TO GITHUB');

  logWarning('⚠️  Make sure you have GitHub credentials configured!');
  logInfo('If prompted, use your GitHub token (not password)');
  logInfo('For more info: https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/\n');

  if (!runCommand(
    `git push -u origin ${CONFIG.branch}`,
    'Push to GitHub'
  )) {
    logError('Failed to push to GitHub');
    logInfo('Troubleshooting:');
    logInfo('  1. Check your internet connection');
    logInfo('  2. Verify GitHub credentials');
    logInfo('  3. Check repository permissions');
    logInfo('  4. Ensure remote URL is correct\n');
    return;
  }

  // Step 9: Verify on GitHub
  logSection('STEP 9️⃣ - VERIFYING ON GITHUB');

  logSuccess('Code pushed successfully!');
  logInfo(`Repository URL: ${CONFIG.githubUrl}`);
  logInfo('👉 Open this URL in your browser to verify your code is there\n');

  // Step 10: Launch the app
  logSection('STEP 🔟 - LAUNCHING APP');

  logInfo('Starting development server...');
  logInfo(`Directory: ${CONFIG.frontendDir}\n`);

  try {
    process.chdir(CONFIG.frontendDir);
    logSuccess('Changed to frontend directory');
    logInfo('Launching: npm run dev\n');
    
    // This will run the dev server in the current terminal
    execSync('npm run dev', { stdio: 'inherit', shell: true });
  } catch (error) {
    logError('Failed to start development server');
    logError(error.message);
    logInfo('\nYou can manually start it with:');
    logInfo(`  cd ${CONFIG.frontendDir}`);
    logInfo('  npm run dev');
  }
}

// ========================================
// 🎬 Run the deployment
// ========================================

logSection('🎯 INITIALIZATION');
console.log(`Version: 1.0.0`);
console.log(`Node: ${process.version}`);
console.log(`Platform: ${process.platform}\n`);

logWarning('⚠️  IMPORTANT:');
logWarning('Before running this script, ensure:');
logWarning('  ✓ You have Git installed');
logWarning('  ✓ You have GitHub credentials configured');
logWarning('  ✓ All files are saved');
logWarning('  ✓ Package.json exists with "dev" script\n');

deploy().catch(error => {
  logError('Deployment failed!');
  console.error(error);
  process.exit(1);
});
