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
      res.json(challenge);
      return;
    }
    res.sendStatus(404);
    res.end();
  } catch (err) {
    res.sendStatus(500);
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
    res.sendStatus(500);
    res.end();
    return;
  }
});

export default challengesRouter;
