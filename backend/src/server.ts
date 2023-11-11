import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import DB, { startPrismaClient } from "./db";
import apiRouter from "./api/router";

const app: Express = express();
const port = Number(process.env.NODE_LOCAL_PORT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello Stick'er");
});
app.use("/media", express.static("media"));
app.use("/api", apiRouter);

const server = app.listen(port, () => {
  console.log(`[server]: App is listening on port ${port}`);
  startPrismaClient();
});

process.on("SIGINT", async () => {
  server.close();
  await DB.prisma?.$disconnect();
});
