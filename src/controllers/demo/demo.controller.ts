import express from "express";
import multer from "multer";

import { DemoService } from "../../services";
import { DemoRepositories } from "../../repositories";
import type { InsertDemo, IQuery } from "../../types";

import { errorHandler, wrapAsyncMiddleware } from "../../middlewares";

import DB from "../../db";

export const demoController = express.Router();

const service = new DemoService(new DemoRepositories(DB.pool));

const upload = multer({
  dest: "files/",
});

const uploadMiddleware = upload.single("my_file");

demoController.get(
  "",
  wrapAsyncMiddleware(async (req, res) => {
    const query = req.query as IQuery;
    const data = await service.getList(query);
    res.send(data);
  }),
);

demoController.get(
  "/:id",
  wrapAsyncMiddleware(async (req, res) => {
    const id = Number(req.params.id);
    const data = await service.getById(id);
    res.send(data);
  }),
);

demoController.post(
  "",
  wrapAsyncMiddleware(async (req, res) => {
    const body = req.body as InsertDemo;
    const data = await service.insert(body);
    res.send(data);
  }),
);

demoController.post(
  "/upload",
  uploadMiddleware,
  wrapAsyncMiddleware(async (req: any, res) => {
    const file = req.file;
    return res.status(200).send({
      data: file,
      message: "SUCCESS",
    });
  }),
);

demoController.use(errorHandler);
