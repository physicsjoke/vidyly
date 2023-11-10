import express from "express";
import { v4 as uuidv4 } from "uuid";
import DB from "../db";
import { timestampToDate } from "../utils/timestampToDate";
import { mediaPath } from "../utils/mediaPath";

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
    // posts.sort((a, b) => b.reactions - a.reactions);
    res.json(posts);
    return;
  } catch (err) {
    res.sendStatus(500);
    res.end();
    return;
  }
});

postsRouter.post("/", async (req, res) => {
  try {
    const { challengeId, authorId, video } = req.body;
    const challenge = await DB.prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });
    if (challenge == null) {
      res.sendStatus(404);
      res.end();
      return;
    }
    const existingPost = await DB.prisma.post.findFirst({
      where: {
        authorId,
        challengeId,
      },
    });
    if (existingPost != null) {
      res.json({
        status: "Challenge has been already completed before",
      });
      return;
    }

    // TODO service through video to stick & save
    let score = Math.min(Math.floor(Math.random() * 100 + 1), 100);

    const rawVideoId = uuidv4();
    await DB.prisma.video.create({
      data: {
        uuid: rawVideoId,
        path: mediaPath(rawVideoId),
      },
    });
    const post = await DB.prisma.post.create({
      data: {
        timestamp: (Date.now() / 1000) | 0,
        title: challenge.title,
        score,
        authorId,
        challengeId,
        videoId: rawVideoId,
      },
    });
    res.json(post);
  } catch (err) {
    res.sendStatus(500);
    res.end();
    return;
  }
});

export default postsRouter;
