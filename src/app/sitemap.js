export default async function sitemap() {
  const baseUrl = process.env.APP_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/projects",
    "/services",
    "/research",
    "/courses",
    "/training",
    "/contact",
    "/about",
    "/privacy",
    "/terms",
    "/cookies",
    "/faq",
    "/help",
    "/refund",
  ];

  const urls = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  return urls;
}
