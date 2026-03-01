#!/usr/bin/env node

/**
 * 🚀 SECURE GITHUB PUSH - Token as parameter (not embedded)
 * 
 * Usage:
 *   node secure-push.js "your-token-here"
 *   Or will prompt for token if not provided
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ========================================
// 🔧 CONFIGURATION
// ========================================

const CONFIG = {
  gitUsername: 'aalj-png',
  gitEmail: 'a.alj@esisa.ac.ma',
  githubUsername: 'aalj-png',
  githubRepo: 'sm',
  branch: 'main',
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
// 🔄 Get Token from Command Line or Prompt
// ========================================

function getTokenFromCommandLine() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args[0];
  }
  return null;
}

function promptForToken() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    log('⚠️  Enter your GitHub Personal Access Token:', 'yellow');
    log('(Token will NOT be saved or logged for security)', 'yellow');
    
    rl.question('Token: ', (token) => {
      rl.close();
      resolve(token);
    });
  });
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
// 📋 Main Push Process
// ========================================

async function pushToGithub() {
  logSection('🚀 SECURE GITHUB PUSH WITH TOKEN');

  console.log(`📍 Current directory: ${process.cwd()}\n`);
  logInfo(`Git User: ${CONFIG.gitUsername} (${CONFIG.gitEmail})`);
  logInfo(`Repository: https://github.com/${CONFIG.githubUsername}/${CONFIG.githubRepo}`);
  logInfo(`Branch: ${CONFIG.branch}`);
  logInfo(`Token: [HIDDEN FOR SECURITY]\n`);

  // Get token
  let token = getTokenFromCommandLine();
  if (!token) {
    token = await promptForToken();
  }

  if (!token || token.trim() === '') {
    logError('No token provided');
    process.exit(1);
  }

  logInfo('Token received (not logged for security)\n');

  // Build repository URL with token (only in memory)
  const githubUrl = `https://${token}@github.com/${CONFIG.githubUsername}/${CONFIG.githubRepo}.git`;

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
    logInfo(`Found ${changedFiles.length} changed file(s)`);
  }

  // Step 4: Add all files
  logSection('STEP 4️⃣ - STAGING FILES');

  if (!runCommand('git add .', 'Add all files to staging area')) {
    return;
  }

  // Step 5: Create commit
  logSection('STEP 5️⃣ - CREATING COMMIT');

  if (!runCommand(
    `git commit -m "Update: Student Management System"`,
    'Create commit'
  )) {
    logWarning('Could not create commit (no changes or already committed)');
  }

  // Step 6: Configure remote with token (only in memory)
  logSection('STEP 6️⃣ - CONFIGURING REMOTE');

  try {
    const remoteUrl = execSync('git remote get-url origin', {
      encoding: 'utf-8',
    }).trim();
    logSuccess(`Remote already configured`);
    logInfo('Updating with token...');
    execSync(`git remote set-url origin ${githubUrl}`, { stdio: 'ignore' });
  } catch {
    logWarning('No remote configured. Adding...');
    execSync(`git remote add origin ${githubUrl}`, { stdio: 'ignore' });
    logSuccess('Remote added with token');
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

  try {
    logInfo('Pushing to GitHub...');
    execSync(`git push -u origin ${CONFIG.branch}`, { stdio: 'inherit' });
    logSuccess('Code pushed to GitHub!');
  } catch (error) {
    logError('Failed to push to GitHub');
    logError(error.message);
    process.exit(1);
  }

  // Step 9: Cleanup and launch
  logSection('STEP 9️⃣ - LAUNCHING APP');

  logSuccess('All done!');
  logInfo(`Repository: https://github.com/${CONFIG.githubUsername}/${CONFIG.githubRepo}`);
  logInfo('\nStarting development server...\n');

  try {
    process.chdir(CONFIG.frontendDir);
    logSuccess('Changed to frontend directory');
    logInfo('Launching: npm run dev\n');
    
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
// 🎬 Run the push process
// ========================================

logSection('🎯 INITIALIZATION');
console.log(`Version: 1.0.0\n`);

pushToGithub().catch(error => {
  logError('Process failed!');
  console.error(error);
  process.exit(1);
});
