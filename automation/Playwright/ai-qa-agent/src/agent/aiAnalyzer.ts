
import 'dotenv/config';

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';

const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'gemma2:2b';

interface TestResult {
  title: string;
  file: string;
  line: number;
  status: string;
  durationMs: number;
  errors?: string[];
  classification?: {
    category?: string;
  };
}

interface QAReport {
  generatedAt?: string;
  source?: string;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  flaky?: number;
  classificationSummary?: Record<string, number>;
  tests: TestResult[];
}

interface OllamaResponse {
  message?: {
    content?: string;
  };
}

function escapeMarkdown(value: string): string {
  return value
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .replace(/`/g, '\\`');
}

function createMarkdownReport(
  report: QAReport,
  aiAnalysis: string,
): string {
  const failedTests = report.tests.filter(
    (test) =>
      test.status === 'failed' ||
      test.status === 'timedOut' ||
      test.status === 'interrupted',
  );

  const failedTestsTable =
    failedTests.length > 0
      ? [
          '| Test | Status | Classification | Duration |',
          '|---|---|---|---:|',
          ...failedTests.map((test) => {
            const title = escapeMarkdown(test.title);
            const status = escapeMarkdown(test.status);
            const classification = escapeMarkdown(
              test.classification?.category ?? 'UNKNOWN',
            );

            return `| ${title} | ${status} | ${classification} | ${test.durationMs} ms |`;
          }),
        ].join('\n')
      : 'No failed tests were detected.';

  const classificationSummary = report.classificationSummary
    ? Object.entries(report.classificationSummary)
        .map(([category, count]) => `- **${category}:** ${count}`)
        .join('\n')
    : 'Classification summary is not available.';

  return `# AI QA Analysis Report

## 1. Test Execution Summary

| Metric | Value |
|---|---:|
| Total tests | ${report.total} |
| Passed | ${report.passed} |
| Failed | ${report.failed} |
| Skipped | ${report.skipped} |
| Flaky | ${report.flaky ?? 0} |

## 2. Failure Details

${failedTestsTable}

## 3. Failure Classification

${classificationSummary}

## 4. AI Analysis

${aiAnalysis}

## 5. Report Information

- Generated: ${new Date().toISOString()}
- AI provider: Ollama
- Model: ${MODEL}
- Source: ${report.source ?? 'reports/qa-analysis.json'}
`;
}

async function main(): Promise<void> {
  const reportsDir = 'reports';
  const inputPath = `${reportsDir}/qa-analysis.json`;
  const jsonOutputPath = `${reportsDir}/ai-analysis.json`;
  const markdownOutputPath = `${reportsDir}/ai-analysis.md`;

  mkdirSync(reportsDir, { recursive: true });

  if (!existsSync(inputPath)) {
    throw new Error(
      `QA report not found: ${inputPath}. Run the test analysis first.`,
    );
  }

  const report = JSON.parse(
    readFileSync(inputPath, 'utf-8'),
  ) as QAReport;

  console.log('\n=== AI QA Agent ===');
  console.log(`Tests analyzed: ${report.total}`);
  console.log(`Failed tests: ${report.failed}`);
  console.log(`Using local model: ${MODEL}`);

  console.log('\nSending test results to Ollama...');

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      messages: [
        {
          role: 'system',
          content: `
You are an experienced QA Engineer and test failure analyst.

Analyze only the supplied Playwright test report.
Do not invent errors, logs, or facts.
Clearly distinguish confirmed facts from possible root causes.
Do not assume that every failure is an application defect.
If all tests passed, explicitly state that no test failures were observed.

Return a concise Markdown report with these sections:

1. Execution Summary
2. Failure Analysis
3. Possible Root Causes
4. Recommended Next Steps
5. Analysis Limitations

For each failure, refer to the actual test name and available error information.
          `.trim(),
        },
        {
          role: 'user',
          content: JSON.stringify(report, null, 2),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Ollama API error: ${response.status} ${response.statusText}`,
    );
  }

  const result = (await response.json()) as OllamaResponse;
  const aiAnalysis = result.message?.content?.trim();

  if (!aiAnalysis) {
    throw new Error('Ollama returned an empty analysis.');
  }

  const output = {
    generatedAt: new Date().toISOString(),
    provider: 'Ollama',
    model: MODEL,
    source: inputPath,
    summary: {
      total: report.total,
      passed: report.passed,
      failed: report.failed,
      skipped: report.skipped,
      flaky: report.flaky ?? 0,
    },
    analysis: aiAnalysis,
  };

  writeFileSync(
    jsonOutputPath,
    JSON.stringify(output, null, 2),
    'utf-8',
  );

  const markdownReport = createMarkdownReport(
    report,
    aiAnalysis,
  );

  writeFileSync(
    markdownOutputPath,
    markdownReport,
    'utf-8',
  );

  console.log('\n=== AI Analysis ===\n');
  console.log(aiAnalysis);

  console.log('\n=== Reports Generated ===');
  console.log(`JSON: ${jsonOutputPath}`);
  console.log(`Markdown: ${markdownOutputPath}`);
}

main().catch((error: unknown) => {
  console.error('\nAI analysis failed:', error);
  process.exitCode = 1;
});
