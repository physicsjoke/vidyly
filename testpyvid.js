const { spawnSync } = require("child_process");
const path = require("path");

const pythonProcess = spawnSync("python3", [
  path.normalize(path.join(__dirname, "./backend/services/videoToPose.py")),
  path.normalize(path.join(__dirname, "./backend/media/jurg.is.mp4")),
  path.normalize(path.join(__dirname, "./backend/media/nephew.mp4")),
  path.normalize(path.join(__dirname, "./backend/media/pose.mp4")),
]);
const result = pythonProcess.stdout?.toString()?.trim();
const error = pythonProcess.stderr?.toString()?.trim();
console.log(result);
const status = result === "OK";
if (status) {
  console.log("OK");
} else {
  console.log(error);
}
