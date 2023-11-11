import express from "express";
import challengesRouter from "./challenges";
import postsRouter from "./posts";

const apiRouter = express.Router();

const SECRET = process.env.SAMPLE_SECRET;

// simple secret auth
// apiRouter.use(function (req, res, next) {
//   if (req.headers.authorization !== SECRET) {
//     res.status(403);
//     res.end();
//     return;
//   }
//   next();
// });

apiRouter.use("/challenges", challengesRouter);
apiRouter.use("/posts", postsRouter);

export default apiRouter;
