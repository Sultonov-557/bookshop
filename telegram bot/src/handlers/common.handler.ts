import { Composer } from "grammy";
import { CommonService } from "../service/common.service";
import { NewContext } from "../common/types/NewContext";

export const commonHandler = new Composer<NewContext>();

commonHandler.command("start", (ctx) => {
  const message = CommonService.start();

  ctx.reply(message.text, { reply_markup: message.keyboard });
});

commonHandler.on("callback_query", (ctx, next) => {
  if (ctx.callbackQueryData.type == "start") {
    const message = CommonService.start();

    ctx.editMessageText(message.text, { reply_markup: message.keyboard });
  }
  next();
});
