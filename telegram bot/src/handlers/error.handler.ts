import { BotError } from "grammy";

export function ErrorHandler(err: BotError) {
  console.log(err.message);
}

