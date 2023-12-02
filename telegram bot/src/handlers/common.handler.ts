import { Composer } from "grammy";

export const commonHandler = new Composer();

commonHandler.command("start", (ctx) => {
  ctx.reply("Salom botimizga hush kelibsiz");
});

commonHandler.command("help", (ctx) => {
  ctx.reply("help");
});
