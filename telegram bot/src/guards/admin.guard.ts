import { NextFunction } from "grammy";
import { NewContext } from "../common/types/NewContext";
import { env } from "../config/env.config";

export async function AdminGuard(ctx: NewContext, next: NextFunction) {
  if (ctx.from?.id != env.ADMIN_ID) {
    ctx.reply("buni qilish uchun admin bo'lishingiz kerak");
  } else {
    next();
  }
}
