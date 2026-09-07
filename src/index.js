import "dotenv/config";
import express from "express";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import indexRoutes from "./routes/index.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
  res.send("hello from health route");
});
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/index", indexRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log("server is running in PORT", PORT);
});
