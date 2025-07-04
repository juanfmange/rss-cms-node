import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
// import { Post } from "../models/post.model";
import { generateRSSFeed } from "../services/rss.service";

const router = Router();
// let posts: Post[] = [];

// Crear un nuevo post
router.post("/", async (req, res) => {
  const { title, content, image } = req.body;
  const newPost = await prisma.post.create({
    data: { title, content, image },
  });
  res.status(201).json(newPost);
});
// router.post("/", (req, res) => {
//   const { title, content } = req.body;
//   const newPost: Post = {
//     id: posts.length + 1,
//     title,
//     content,
//     date: new Date(),
//   };
//   posts.push(newPost);
//   res.status(201).json(newPost);
// });

// Obtener todos los posts
router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({ orderBy: { date: "desc" } });
  res.json(posts);
});
// router.get("/", (req, res) => {
//   res.json(posts);
// });

// Obtener un post por ID
// router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
//   const { id } = req.params;
//   const post = await prisma.post.findUnique({ where: { id: Number(id) } });
//   if (!post) return res.status(404).json({ error: "Post no encontrado" });
//   res.json(post);
// });

// Actualizar un post
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, image },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ error: "Post no encontrado" });
  }
});

// Eliminar un post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({ where: { id: Number(id) } });
    res.json({ message: "Post eliminado" });
  } catch (error) {
    res.status(404).json({ error: "Post no encontrado" });
  }
});


// Obtener RSS feed
router.get("/rss", async (req, res) => {
  const posts = await prisma.post.findMany({ orderBy: { date: "desc" } });
  const xml = generateRSSFeed(posts);
  res.type("application/rss+xml").send(xml);
});
// router.get("/rss", (req, res) => {
//   const xml = generateRSSFeed(posts);
//   res.type("application/rss+xml").send(xml);
// });

export default router;
