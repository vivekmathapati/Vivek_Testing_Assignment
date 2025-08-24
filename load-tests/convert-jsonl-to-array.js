const fs = require('fs');

const inputFile = 'load-tests/results.json';
const outputFile = 'load-tests/results-array.json';

if (!fs.existsSync(inputFile)) {
  console.error(`Input file ${inputFile} not found. Run your k6 test with --out json=${inputFile}`);
  process.exit(1);
}

const lines = fs.readFileSync(inputFile, 'utf-8')
  .split('\n')
  .filter(Boolean);

const jsonArray = lines.map(line => JSON.parse(line));

fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));
console.log(`Converted ${inputFile} to JSON array at ${outputFile}`);
