import axios from "axios";
import { Composer, InlineKeyboard } from "grammy";
import { AuthGuard } from "../guards/auth.guard";
import { NewContext } from "../common/types/NewContext";
import { SaveService } from "../service/save.service";

export const saveHandler = new Composer<NewContext>();

saveHandler.callbackQuery(/^save_(.+)/, AuthGuard, async (ctx) => {
  SaveService.save(ctx.user.ID, +ctx.match[1]);
});

saveHandler.command("saves", AuthGuard, async (ctx) => {
  const saves = await SaveService.getSaves(ctx.user.ID);
  ctx.reply(saves.text, { reply_markup: saves.keyboard });
});
