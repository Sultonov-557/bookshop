import axios from "axios";
import { Composer } from "grammy";

export const authHandler = new Composer();

authHandler.hears(/^\/register (.+) (.+)/, async (ctx) => {
  const username = ctx.match[1];
  const password = ctx.match[2];

  //   const user = await axios( {
  //     username,
  //     password,
  //     telegramID: ctx.from?.id,
  //   });
  const user = await axios({
    url: "http://localhost:80/auth/register",
    method: "POST",
    data: {
      username,
      password,
      telegramID: ctx.from?.id,
    },
  });
  console.log(user);
});
