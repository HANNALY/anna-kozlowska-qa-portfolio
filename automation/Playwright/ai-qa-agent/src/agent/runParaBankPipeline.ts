import { execSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  rmSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';

const agentDir = process.cwd();

const paraBankDir = resolve(
  agentDir,
  '../ParaBank',
);

const reportPath = resolve(
  paraBankDir,
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
  console.log('\n=== AI QA Pipeline: ParaBank ===\n');

  // 1. Prepare report directories.
  mkdirSync(dirname(reportPath), { recursive: true });
  mkdirSync(resolve(agentDir, 'reports'), { recursive: true });
  rmSync(reportPath, { force: true });

  // 2. Run ParaBank tests.
  let testsFailed = false;

  console.log('Step 1/3: Running ParaBank tests...\n');

  try {
    runCommand('npx playwright test', paraBankDir);
  } catch {
    testsFailed = true;
    console.log('\nSome tests failed. Continuing with AI analysis.');
  }

  // 3. Verify that this run generated a report.
  if (!existsSync(reportPath)) {
    throw new Error(
      'Playwright JSON report was not generated. ' +
      'Check the ParaBank Playwright configuration.',
    );
  }

  // 4. Analyze Playwright results.
  console.log('\nStep 2/3: Analyzing ParaBank test results...\n');

  runCommand('npm run analyze', agentDir, {
    ...process.env,
    QA_REPORT_PATH: reportPath,
  });

  // 5. Run AI analysis.
  console.log('\nStep 3/3: Running AI analysis...\n');

  runCommand('npm run ai:analyze', agentDir);

  console.log('\n=== ParaBank Pipeline completed ===');
  console.log(
    `Playwright report: ${reportPath}`,
  );
  console.log(
    `AI report: ${resolve(agentDir, 'reports/ai-analysis.md')}`,
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
  console.error('\nParaBank pipeline failed:', error);
  process.exitCode = 1;
});