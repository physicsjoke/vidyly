import { spawnSync } from "child_process";
import path from "path";

export default function analyzeScore(
  challengeVideoPath: string,
  postVideoPath: string
) {
  let start = Date.now();
  const pythonProcess = spawnSync("python3", [
    path.normalize(path.join(__dirname, "../../../services/compare.py")),
    path.normalize(
      path.join(__dirname, `../../../media/${challengeVideoPath}.mp4`)
    ),
    path.normalize(path.join(__dirname, `../../../media/${postVideoPath}.mp4`)),
  ]);
  const result = pythonProcess.stdout?.toString()?.trim();
  const error = pythonProcess.stderr?.toString()?.trim();
  let score = Number(result);
  
  if (result && (score === 0 || score)) {
    score |= 0;
    console.log(
      `Analyze score: "${score}", time spent: ${
        ((Date.now() - start) / 1000) | 0
      }s`
    );
    return score;
  } else {
    throw error;
  }
}
