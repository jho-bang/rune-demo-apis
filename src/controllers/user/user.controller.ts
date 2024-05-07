import express from "express";

import { UserService } from "../../services";
import { UserRepositories } from "../../repositories";

import DB from "../../db";
import { errorHandler, wrapAsyncMiddleware } from "../../middlewares";

export const userController = express.Router();

const service = new UserService(new UserRepositories(DB.pool));

userController.get(
  "/profile",
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
