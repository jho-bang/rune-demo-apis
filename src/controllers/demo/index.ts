import express from 'express';
import { Service } from '../../services/demo';
import { DemoRepositories } from '../../repositories/demo';
import DB from '../../db';
import type { InsertDemo } from '../../types';
import multer from 'multer';

export const demoRouter = express.Router();

const service = new Service(new DemoRepositories(DB.pool));

const upload = multer({
  dest: 'files/',
});

const uploadMiddleware = upload.single('my_file');

demoRouter.get('', async (req, res) => {
  const data = await service.query();
  res.send({ data });
});

demoRouter.post('', async (req, res) => {
  const body = req.body as InsertDemo;

  const data = await service.insert(body);
  res.send({ data });
});

demoRouter.post('/upload', uploadMiddleware, async (req, res) => {
  return res.status(200).send({
    data: req.file,
  });
});
