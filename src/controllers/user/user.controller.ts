import express from "express";
import apicache from "apicache";

import { UserService } from "../../services";
import { UserRepositories } from "../../repositories";
import { errorHandler, wrapAsyncMiddleware } from "../../middlewares";

import DB from "../../db";

export const userController = express.Router();

const cacheMiddleware = apicache.middleware;

const service = new UserService(new UserRepositories(DB.pool));

userController.get(
  "/profile",
  cacheMiddleware("5 minutes"),
  wrapAsyncMiddleware(async (req, res) => {
    const access_token = (req.headers["access_token"] || "") as string;
    const profile = await service.profile(access_token);

    res.send({
      data: profile,
      message: "SUCCESS",
    });
  }),
);

userController.use(errorHandler);
