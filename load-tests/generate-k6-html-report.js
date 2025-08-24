const reporter = require('k6-html-reporter');
const fs = require('fs');

const inputFile = 'load-tests/summary.json';
const outputFile = 'load-tests/report.html';

if (!fs.existsSync(inputFile)) {
  console.error(`Input file ${inputFile} not found. Run your k6 test with --out json=${inputFile}`);
  process.exit(1);
}

reporter.generateSummaryReport({
  jsonFile: inputFile,
  output: outputFile
});

console.log(`HTML report generated: ${outputFile}`);
