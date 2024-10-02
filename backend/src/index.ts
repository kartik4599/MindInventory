import Express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import taskRouter from "./task.routes";
const app = Express();
import { Server } from "socket.io";

app.use(Express.json(), cors({ origin: "*" }));

app.use("/task", taskRouter);

export const prismaClient = new PrismaClient();

const server = app.listen(4000, () => {
  console.log("Server Started at Port:4000");
});

// Socket Handler
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("Connected", socket.id);
  io.emit("start", "hello");
});

setInterval(async () => {
  const data = await prismaClient.task.findMany();
  data.map(async ({ notified, deadline, id, name }) => {
    if (notified) return;
    const today = new Date();
    const DeadLine = new Date(deadline);
    if (!(today.toDateString() === DeadLine.toDateString())) return;
    if (!(today.getHours() === DeadLine.getHours())) return;
    if (!(today.getMinutes() === DeadLine.getMinutes())) return;
    io.emit("notify", JSON.stringify({ id, name }));
    await prismaClient.task.update({ where: { id }, data: { notified: true } });
  });
}, 1000);
