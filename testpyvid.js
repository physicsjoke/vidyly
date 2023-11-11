const { spawnSync } = require("child_process");
const path = require("path");
let start = Date.now();
const pythonProcess = spawnSync("python3", [
  path.normalize(path.join(__dirname, "./backend/services/compare.py")),
  path.normalize(path.join(__dirname, "./backend/media/d24c4287-1e9e-4246-9938-f76d40bc3e2d.mp4")),
  path.normalize(path.join(__dirname, "./backend/media/copy.mp4")),
  path.normalize(path.join(__dirname, "./backend/media/pose.mp4")),
]);
const result = pythonProcess.stdout?.toString()?.trim();
const error = pythonProcess.stderr?.toString()?.trim();
let score = Number(result);

if (result && (score === 0 || score)) {
  score |= 0;
  console.log("OK: ", score);
} else {
  console.log(error);
}
console.log((Date.now() - start) / 1000 | 0);