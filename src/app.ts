import cors from "cors";
import express from "express";

const app = express();

// register middleware
app.use(
  express.json({
    limit: "50mb",
    strict: true,
  })
);
// register cors middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://example.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-TOKEN"],
    exposedHeaders: ["X-CSRF-TOKEN"],
  })
);

// default routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;
