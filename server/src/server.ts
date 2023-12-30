import { app } from "./app";

export const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `⭐ STAR Server | 🌄 NODE_ENV: ${process.env.NODE_ENV} | 📞 SERVER_PORT: ${process.env.SERVER_PORT}`
  );
});
