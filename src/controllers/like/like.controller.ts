import express from "express";

import { errorHandler, wrapAsyncMiddleware } from "../../middlewares";

import DB from "../../db";
import { LikeService, UserService } from "../../services";
import { LikeRepositories, UserRepositories } from "../../repositories";
import type { IInsertLike } from "../../types";

export const likeController = express.Router();

const service = new LikeService(new LikeRepositories(DB.pool));
const userService = new UserService(new UserRepositories(DB.pool));

likeController.post(
  "/add",
  wrapAsyncMiddleware(async (req, res) => {
    const body = req.body as IInsertLike;
    const access_token = (req.headers["access_token"] || "") as string;
    const profile = await userService.profile(access_token);
    const data = await service.like({
      ...body,
      user_id: profile.id,
    });
    res.send(data);
  }),
);

likeController.put(
  "/remove",
  wrapAsyncMiddleware(async (req, res) => {
    const body = req.body as IInsertLike;
    const access_token = (req.headers["access_token"] || "") as string;
    const profile = await userService.profile(access_token);
    const data = await service.unlike({
      ...body,
      user_id: profile.id,
    });
    res.send(data);
  }),
);

likeController.use(errorHandler);
