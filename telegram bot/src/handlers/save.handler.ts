import axios from "axios";
import { Composer, InlineKeyboard } from "grammy";
import { AuthGuard } from "../guards/auth.guard";
import { NewContext } from "../common/types/NewContext";
import { SaveService } from "../service/save.service";

export const saveHandler = new Composer<NewContext>();

saveHandler.on("callback_query:data", AuthGuard, async (ctx, next) => {
  if (ctx.callbackQueryData.type == "save") {
    const message = await SaveService.save(
      ctx.user.ID,
      +ctx.callbackQueryData.args[0]
    );
    if (message) {
      ctx.answerCallbackQuery("saved");
    } else {
      ctx.answerCallbackQuery("already saved");
    }
  }
  if (ctx.callbackQueryData.type == "unsave") {
    const message = await SaveService.unsave(
      ctx.user.ID,
      +ctx.callbackQueryData.args[0]
    );

    if (message) {
      ctx.answerCallbackQuery("unsaved");
    } else {
      ctx.answerCallbackQuery("not saved");
    }
  }

  if (ctx.callbackQueryData.type == "saves") {
    const saves = await SaveService.getSaves(ctx.user.ID);

    saves.keyboard
      .row()
      .text("back", JSON.stringify(ctx.callbackQueryData.from));

      ctx.reply(saves.text, { reply_markup: saves.keyboard });
  }
  next();
});

saveHandler.command("saves", AuthGuard, async (ctx) => {
  const saves = await SaveService.getSaves(ctx.user.ID);
  ctx.reply(saves.text, { reply_markup: saves.keyboard });
});
