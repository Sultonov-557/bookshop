import axios from "axios";
import { Composer } from "grammy";

export const authHandler = new Composer();

authHandler.hears(/^\/register (.+) (.+)/, async (ctx) => {
  const username = ctx.match[1];
  const password = ctx.match[2];
  const telegramID = ctx.from?.id + "";

  const res = await axios.post("http://localhost:80/auth/register", {
    username,
    password,
    telegramID,
  });

  if (res.data.success) {
    ctx.reply("siz registratsiyadan o'tdingiz");
  } else {
    ctx.reply("error 404");
  }
});
