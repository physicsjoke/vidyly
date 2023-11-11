const { spawnSync } = require("child_process");
const path = require("path");

const pythonProcess = spawnSync("python3", [
  path.normalize(path.join(__dirname, "./backend/services/compare.py")),
  path.normalize(path.join(__dirname, "./backend/media/jurg.is.mp4")),
  path.normalize(path.join(__dirname, "./backend/media/nephew.mp4")),
  path.normalize(path.join(__dirname, "./backend/media/pose.mp4")),
]);
const result = pythonProcess.stdout?.toString()?.trim();
const error = pythonProcess.stderr?.toString()?.trim();
let score = Number(result);
if (!error && (score === 0 || score)) {
  score |= 0;
  console.log("OK: ", score);
} else {
  console.log(error);
}

console.log({result, error});
