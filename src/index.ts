import express from "express";
import postRoutes from "./routes/post.routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
