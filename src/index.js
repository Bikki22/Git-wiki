import express from "express";
import "dotenv/config";

const app = express();

app.get("/health", (req, res) => {
  res.send("hello world");
});
