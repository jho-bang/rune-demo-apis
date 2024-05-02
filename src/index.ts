import { app } from "@rune-ts/server";
import express from "express";
import cors from "cors";
import { demoController } from "./controllers";
import DB from "./db";

const server = app();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use("/files", express.static("files"));

// ====== controller ======
server.use("/api/v1/demo", demoController);
// ====== controller ======

server.onEvent("connect", () => {
  console.log("connect");
});

server.onEvent("close", async () => {
  console.log("close");
  DB.pool.END();
});

server.get("/", async function (req, res) {
  res.send("Health Check");
});
