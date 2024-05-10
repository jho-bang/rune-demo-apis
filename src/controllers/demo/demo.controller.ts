import express from "express";
import multer from "multer";
import uuid4 from "uuid4";

import { DemoService, UserService } from "../../services";
import { DemoRepositories, UserRepositories } from "../../repositories";
import type { IListQuery, InsertDemo } from "../../types";
import { errorHandler, wrapAsyncMiddleware } from "../../middlewares";

import DB from "../../db";

export const demoController = express.Router();

const service = new DemoService(new DemoRepositories(DB.pool));
const userService = new UserService(new UserRepositories(DB.pool));

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      const randomID = uuid4();
      const filename = `${randomID}.${file.mimetype.split("/")[1]}`;
      done(null, filename);
    },
    destination(req, file, done) {
      done(null, "files");
    },
  }),
});

const uploadMiddleware = upload.single("my_file");

demoController.get(
  "",
  wrapAsyncMiddleware(async (req, res) => {
    const query = req.query as IListQuery;
    const data = await service.getList(query);
    res.send(data);
  }),
);

demoController.get(
  "/my/list",
  wrapAsyncMiddleware(async (req, res) => {
    const query = req.query as IListQuery;
    const data = await service.getMyList(query);
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
    const access_token = (req.headers["access_token"] || "") as string;
    const profile = await userService.profile(access_token);
    const data = await service.insert({
      ...body,
      user_id: profile.id,
    });
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
