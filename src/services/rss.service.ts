import RSS from "rss";
import { Post } from "@prisma/client";
//import { Post } from "../models/post.model";

export function generateRSSFeed(posts: Post[]): string {
  const feed = new RSS({
    title: "Portal MX",
    description: "Sindicando contenido desde SQLite (migrar a MS SQL Server)",
    feed_url: "http://localhost:3000/rss",
    site_url: "http://localhost:3000",
    language: "es",
  });

  posts.forEach((post) => {
    // Agrega la imagen en HTML si existe
    const description = post.image
      ? `<img src="${post.image}" alt="${post.title}" style="max-width:100%;"/><br>${post.content}`
      : post.content;

    feed.item({
      title: post.title,
      description,
      url: `http://localhost:3000/posts/${post.id}`,
      date: post.date,
    });
  });


  return feed.xml({ indent: true });
}
