import { Router } from "express";
import { prismaClient } from ".";

const taskRouter = Router();

// Fetching Data
taskRouter.get("/", async (req, res) => {
  const data = await prismaClient.task.findMany({
    orderBy: { createdAr: "asc" },
  });
  res.status(200).json({ data });
});

// Creating Data
taskRouter.post("/", async (req, res) => {
  const { name, deadline } = req.body;

  const data = await prismaClient.task.create({
    data: { name, deadline },
  });

  res.status(201).json({ data });
});

// Updating Data
taskRouter.put("/:id", async (req, res) => {
  const { name, deadline } = req.body;
  const { id } = req.params;

  const data = await prismaClient.task.update({
    where: { id: Number(id) },
    data: { name, deadline },
  });

  res.status(201).json({ data });
});

// Delete Data
taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const data = await prismaClient.task.delete({
    where: { id: Number(id) },
  });

  res.status(201).json({ data });
});

export default taskRouter;
