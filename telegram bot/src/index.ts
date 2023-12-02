import { Bot } from "grammy";
import { env } from "./config/env.config";
import { commonHandler } from "./handlers/common.handler";
import { categoryHandler } from "./handlers/category.handler";
import { bookHandler } from "./handlers/book.handler";

const bot = new Bot(env.TOKEN);
bot.start();

bot.use(commonHandler);
bot.use(categoryHandler);
bot.use(bookHandler);
