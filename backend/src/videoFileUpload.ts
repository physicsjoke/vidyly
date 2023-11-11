import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.normalize(path.join(__dirname, "../../media")));
  },
  filename: function (req, file, cb) {
    const videoUuid = uuidv4();
    req.body.videoUuid = videoUuid;
    cb(null, `${videoUuid}.mp4`);
  },
});

const videoUpload = multer({ storage: videoStorage });

export default videoUpload;
