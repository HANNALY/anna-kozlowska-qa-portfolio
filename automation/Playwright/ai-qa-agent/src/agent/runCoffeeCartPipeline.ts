import { execSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  rmSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';

const agentDir = process.cwd();

const coffeeCartDir = resolve(
  agentDir,
  '../qa_pw_coffee_cart_pom_ts',
);

const reportPath = resolve(
  coffeeCartDir,
  'reports/test-results.json',
);

function runCommand(
  command: string,
  cwd: string,
  env: NodeJS.ProcessEnv = process.env,
): void {
  execSync(command, {
    cwd,
    env,
    stdio: 'inherit',
  });
}

async function main(): Promise<void> {
  console.log('\n=== AI QA Pipeline: Coffee Cart ===\n');

  // 1. Prepare a clean report location.
  mkdirSync(dirname(reportPath), { recursive: true });
  rmSync(reportPath, { force: true });

  // 2. Run Coffee Cart tests.
  let testsFailed = false;

  console.log('Step 1/3: Running Coffee Cart tests...\n');

  try {
    runCommand('npx playwright test', coffeeCartDir);
  } catch {
    testsFailed = true;
    console.log('\nSome tests failed. Continuing with AI analysis.');
  }

  // 3. Verify that this run generated a report.
  if (!existsSync(reportPath)) {
    throw new Error(
      'Playwright JSON report was not generated. ' +
      'Check the test configuration and execution.',
    );
  }

  // 4. Analyze the report.
  console.log('\nStep 2/3: Analyzing test results...\n');

  runCommand('npm run analyze', agentDir, {
    ...process.env,
    QA_REPORT_PATH: reportPath,
  });

  // 5. Run local AI analysis.
  console.log('\nStep 3/3: Running AI analysis...\n');

  runCommand('npm run ai:analyze', agentDir);

  console.log('\n=== Pipeline completed ===');
  console.log(
    `AI report: ${resolve(agentDir, 'reports/ai-analysis.json')}`,
  );

  if (testsFailed) {
    process.exitCode = 1;
    console.log(
      '\nThe pipeline completed, but some tests failed. ' +
      'Review the Playwright and AI reports.',
    );
  }
}

main().catch((error: unknown) => {
  console.error('\nPipeline failed:', error);
  process.exitCode = 1;
});