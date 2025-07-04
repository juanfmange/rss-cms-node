import { Router } from "express";
import prisma from "../lib/prisma";
import { Post } from "../models/post.model";
import { generateRSSFeed } from "../services/rss.service";

const router = Router();
let posts: Post[] = [];

// Crear un nuevo post
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newPost = await prisma.post.create({
    data: { title, content },
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
