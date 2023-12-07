import axios from "axios";
import { Composer } from "grammy";

export const saveHandler = new Composer();

saveHandler.callbackQuery(/^save_/, async (ctx) => {
  const bookID = +ctx.callbackQuery.data.replace("save_", "");
  const telegramID = ctx.from.id;

  const verify: { success: boolean; user?: { ID: number } } = await axios.post(
    `http://localhost/auth/verify/${telegramID}`
  );

  if (!verify.success) {
    ctx.reply("registratsiyadan o'tilmagan");
    return;
  }

  const userID = verify.user?.ID;

  const saveRes = await axios.post(`http://localhost/save/`, {
    userID,
    bookID,
  });
  console.log(saveRes);

  ctx.reply("saved");
});
