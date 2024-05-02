import express from "express";
import multer from "multer";

import { Service } from "../../services/demo/demo.service";
import { DemoRepositories } from "../../repositories/demo/demo.repository";
import type { InsertDemo } from "../../types";

import DB from "../../db";
import type { IQuery } from "../../shared/common.type";

export const demoController = express.Router();

const service = new Service(new DemoRepositories(DB.pool));

const upload = multer({
  dest: "files/",
});

const uploadMiddleware = upload.single("my_file");

demoController.get("", async (req, res) => {
  const query = req.query as IQuery;
  const data = await service.getList(query);
  res.send({ data });
});

demoController.post("", async (req, res) => {
  const body = req.body as InsertDemo;

  const data = await service.insert(body);
  res.send({ data });
});

demoController.post("/upload", uploadMiddleware, async (req: any, res) => {
  const file = req.file;
  return res.status(200).send({
    data: file,
  });
});
