const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../model/file');
const Router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 50000000 // max file size 50MB = 50000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MP4|MP3|mp3|mov|MOV|WMV|wmv)$/)) {
      return cb(
        new Error(
          'only upload files with mp4, mp3, wmv or mov format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
      console.log("error uploading file");
      console.log(error);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

Router.delete('/delete/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    fs.unlink(path.join(__dirname, '..', file.file_path), (err) => {
      if (err) { 
        console.error(err)
      }
    })
    file.remove({_id:mongoose.Types.ObjectId(req.params.id)});
  } catch (error) {
    res.status(400).send('Error while deleting file. Try again later.');
  }
});

module.exports = Router;