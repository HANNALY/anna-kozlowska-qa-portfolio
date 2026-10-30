import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';

type ErrorCategory =
  | 'ASSERTION_ERROR'
  | 'LOCATOR_ERROR'
  | 'TIMEOUT_ERROR'
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'AUTH_ERROR'
  | 'TEST_DATA_ERROR'
  | 'UNKNOWN_ERROR'
  | 'NONE';

interface TestResult {
  status: string;
  duration: number;
  errors?: Array<{
    message?: string;
    stack?: string;
  }>;
}

interface TestSpec {
  title: string;
  file: string;
  line: number;
  tests: Array<{
    results: TestResult[];
  }>;
}

interface TestSuite {
  title: string;
  specs?: TestSpec[];
  suites?: TestSuite[];
}

interface PlaywrightReport {
  stats: {
    expected: number;
    unexpected: number;
    skipped: number;
    flaky: number;
    duration: number;
  };
  suites: TestSuite[];
}

interface AnalyzedTest {
  title: string;
  file: string;
  line: number;
  status: string;
  durationMs: number;
  errors: string[];
  classification: {
    category: ErrorCategory;
    reason: string;
  };
}

function collectSpecs(suites: TestSuite[]): TestSpec[] {
  return suites.flatMap((suite) => [
    ...(suite.specs ?? []),
    ...collectSpecs(suite.suites ?? []),
  ]);
}


function classifyError(
  status: string,
  errorText: string,
): { category: ErrorCategory; reason: string } {
  const error = errorText.toLowerCase();

  if (status === 'passed' || status === 'skipped') {
    return {
      category: 'NONE',
      reason: 'No test failure detected.',
    };
  }

  if (/timeout|timed out|exceeded.*timeout|waiting for/.test(error)) {
    return {
      category: 'TIMEOUT_ERROR',
      reason: 'The operation exceeded its expected execution time.',
    };
  }

  if (
    /locator|selector|strict mode violation|element not found|no element|waiting for.*selector|resolved to/.test(error)
  ) {
    return {
      category: 'LOCATOR_ERROR',
      reason: 'Playwright could not locate or uniquely identify the expected element.',
    };
  }

  if (
    /expect\s*\(|assertionerror|expected:|toequal|tobevisible|tocontaintext|tobeenabled|received:/.test(error)
  ) {
    return {
      category: 'ASSERTION_ERROR',
      reason: 'An expected value or application state did not match the actual result.',
    };
  }

  if (
    /401|403|unauthorized|forbidden|authentication|invalid credentials|login failed/.test(error)
  ) {
    return {
      category: 'AUTH_ERROR',
      reason: 'The request or action may have failed due to authentication or authorization.',
    };
  }

  if (
    /api|http response|status code|500|502|503|504|requestfailed|response status/.test(error)
  ) {
    return {
      category: 'API_ERROR',
      reason: 'The failure appears to involve an API request or HTTP response.',
    };
  }

  if (
    /econnrefused|enotfound|net::|network|connection refused|socket hang up|err_name_not_resolved/.test(error)
  ) {
    return {
      category: 'NETWORK_ERROR',
      reason: 'The failure may be related to network connectivity or server availability.',
    };
  }

  if (
    /test data|no options|no available accounts|account not found|invalid test data/.test(error)
  ) {
    return {
      category: 'TEST_DATA_ERROR',
      reason: 'The failure may be caused by missing, invalid, or unavailable test data.',
    };
  }

  return {
    category: 'UNKNOWN_ERROR',
    reason: 'The failure could not be classified using the available error information.',
  };
}

function analyzeReport(): void {
  const agentDir = process.cwd();

  const reportPath = resolve(
    agentDir,
    process.env.QA_REPORT_PATH ?? 'reports/test-results.json',
  );

  const outputPath = resolve(agentDir, 'reports/qa-analysis.json');

  if (!existsSync(reportPath)) {
    throw new Error(`Playwright report not found: ${reportPath}`);
  }

  const rawReport = readFileSync(reportPath, 'utf-8');
  const report = JSON.parse(rawReport) as PlaywrightReport;

  const specs = collectSpecs(report.suites ?? []);

  const tests: AnalyzedTest[] = specs.flatMap((spec) =>
    spec.tests.flatMap((test) =>
      test.results.map((result) => {
        const errors = (result.errors ?? []).map(
          (error) => error.message ?? error.stack ?? 'Unknown error',
        );

        const errorText = errors.join(' ');

        return {
          title: spec.title,
          file: spec.file,
          line: spec.line,
          status: result.status,
          durationMs: result.duration,
          errors,
          classification: classifyError(result.status, errorText),
        };
      }),
    ),
  );

  const failedStatuses = [
    'failed',
    'timedOut',
    'interrupted',
  ];

  const classificationSummary = tests.reduce(
    (summary, test) => {
      summary[test.classification.category] =
        (summary[test.classification.category] ?? 0) + 1;

      return summary;
    },
    {} as Record<string, number>,
  );

  const summary = {
    generatedAt: new Date().toISOString(),
    source: reportPath,
    total: tests.length,
    passed: tests.filter((test) => test.status === 'passed').length,
    failed: tests.filter((test) =>
      failedStatuses.includes(test.status),
    ).length,
    skipped: tests.filter((test) => test.status === 'skipped').length,
    flaky: report.stats?.flaky ?? 0,
    classificationSummary,
    tests,
  };

  mkdirSync(dirname(outputPath), { recursive: true });

  writeFileSync(outputPath, JSON.stringify(summary, null, 2));

  console.log('\nQA Analysis Summary');
  console.log('-------------------');
  console.log(`Total tests: ${summary.total}`);
  console.log(`Passed: ${summary.passed}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Skipped: ${summary.skipped}`);
  console.log(`Flaky: ${summary.flaky}`);
  console.log('\nClassification summary:');
  console.log(JSON.stringify(classificationSummary, null, 2));
  console.log(`\nReport saved to: ${outputPath}`);
}

analyzeReport();
