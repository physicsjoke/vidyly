import express from "express";
import { v4 as uuidv4 } from "uuid";
import DB from "../db";
import { mediaPath } from "../utils/mediaPath";
import videoUpload from "../videoUpload";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
  try {
    const posts = await DB.prisma.post.findMany({
      include: {
        challenge: {
          include: {
            video: true,
          },
        },
        video: true,
        author: true,
      },
    });
    posts.sort((a, b) => b.timestamp - a.timestamp);
    res.json(posts);
    return;
  } catch (err) {
    res.sendStatus(500);
    res.end();
    return;
  }
});

postsRouter.post("/", videoUpload.single("video"), async (req, res) => {
  try {
    const { challengeId, authorId, videoUuid } = req.body;
    console.log({ challengeId, authorId, videoUuid, fp: req.file?.path });
    if (req.file?.path == null) {
      res.sendStatus(400);
      res.json({
        status: "Upload failed",
      });
      return;
    }
    const challenge = await DB.prisma.challenge.findUnique({
      where: {
        id: Number(challengeId),
      },
    });
    if (challenge == null) {
      res.sendStatus(400);
      res.json({
        status: "Challenge not found",
      });
      return;
    }
    const existingPost = await DB.prisma.post.findFirst({
      where: {
        authorId: Number(authorId),
        challengeId: Number(challengeId),
      },
    });
    if (existingPost != null) {
      res.sendStatus(400);
      res.json({
        status: "Challenge has been already completed before",
      });
      return;
    }
    // TODO service through video to stick & save
    let score = Math.min(Math.floor(Math.random() * 100 + 1), 100);
    await DB.prisma.video.create({
      data: {
        uuid: videoUuid,
        path: mediaPath(videoUuid),
      },
    });
    const post = await DB.prisma.post.create({
      data: {
        timestamp: (Date.now() / 1000) | 0,
        title: challenge.title,
        score,
        authorId: Number(authorId),
        challengeId: Number(challengeId),
        videoId: videoUuid,
      },
    });
    res.json(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    res.end();
    return;
  }
});

export default postsRouter;
