import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome! to my server",
  });
});

// PORT
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
