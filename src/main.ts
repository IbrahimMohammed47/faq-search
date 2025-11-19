import express from "express";
import path from "path";
import searchController from "./search";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.post("/api/search", searchController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
