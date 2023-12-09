import { NextFunction } from "grammy";
import { NewContext } from "../common/types/NewContext";
import axios from "axios";

export async function AuthGuard(ctx: NewContext, next: NextFunction) {
  const res = await axios.get(
    "http://localhost:80/auth/verify/" + ctx.from?.id
  );

  if (res.data.success) {
    ctx.user = res.data.user;
    next();
  } else {
    ctx.reply(
      "siz ro'yhatdan otmagansiz\nro'yhatdan o'tish uchun - /register <username> <parol>"
    );
  }
}
