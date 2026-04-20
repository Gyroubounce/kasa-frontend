import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/favorites",
          "/messages",
          "/messages/",
          "/login",
          "/register",
          "/logout",
          "/add-property",
        ],
      },
    ],
    sitemap: "https://kasa-frontend-taupe.vercel.app/sitemap.xml",
  };
}
