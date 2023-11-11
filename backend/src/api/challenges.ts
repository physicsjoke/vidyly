import express from "express";
import DB from "../db";
import { timestampToDate } from "../utils/timestampToDate";

const challengesRouter = express.Router();

challengesRouter.get("/daily", async (req, res) => {
  try {
    const date = timestampToDate(Date.now());
    const challenge = await DB.prisma.challenge.findFirst({
      where: {
        date,
        type: "DAILY",
      },
    });
    if (challenge != null) {
      let completed = false;
      try {
        const userPost = await DB.prisma.post.findFirst({
          where: {
            challengeId: challenge.id,
            authorId: 1,
          },
        });
        if (userPost != null) {
          completed = true;
        }
      } catch (err) {}
      res.json({
        ...challenge,
        completed,
      });
      return;
    }
    res.status(404);
    res.end();
  } catch (err) {
    console.log("/api/challenges/daily", err);
    res.status(500);
    res.end();
    return;
  }
});

challengesRouter.get("/", async (req, res) => {
  try {
    const challenges = await DB.prisma.challenge.findMany({
      where: {
        type: "COMMON",
      },
    });
    res.json(challenges);
  } catch (err) {
    console.log("/api/challenges", err);
    res.status(500);
    res.end();
    return;
  }
});

challengesRouter.get("/:id/leaders", async (req, res) => {
  try {
    const posts = await DB.prisma.post.findMany({
      where: {
        challengeId: Number(req.params.id),
      },
      include: {
        author: true,
      },
    });
    const leaderboard = posts
      .map((post) => {
        return {
          score: post.score,
          name: post.author.name,
        };
      })
      .sort((a, b) => b.score - a.score);
    res.json(leaderboard);
  } catch (err) {
    console.log("/api/challenges/:id/leaders", err);
    res.status(500);
    res.end();
    return;
  }
});

export default challengesRouter;
