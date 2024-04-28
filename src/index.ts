import { app } from '@rune-ts/server';
import express from 'express';
import cors from 'cors';
import { demoRouter } from './controllers';

const server = app();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use('/files', express.static('files'));

server.use('/api/v1/demo', demoRouter);

server.get('/', async function (req, res) {
  res.send('Health Check');
});
