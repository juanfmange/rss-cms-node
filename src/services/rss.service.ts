import RSS from "rss";
import { Post } from "@prisma/client";
//import { Post } from "../models/post.model";

export function generateRSSFeed(posts: Post[]): string {
  const feed = new RSS({
    title: "Prueba demo RSS",
    description: "Sindicando contenido desde SQLite (migrar a MS SQL Server",
    feed_url: "http://localhost:3000/rss",
    site_url: "http://localhost:3000",
    language: "es",
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.content,
      url: `http://localhost:3000/posts/${post.id}`,
      date: post.date,
    });
  });

  return feed.xml({ indent: true });
}
