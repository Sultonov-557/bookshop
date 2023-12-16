import axios from "axios";
import { Composer, InlineKeyboard } from "grammy";
import { CategoryService } from "../service/category.service";
import { NewContext } from "../common/types/NewContext";

export const categoryHandler = new Composer<NewContext>();

export async function categories(ctx: NewContext) {
  const page = +ctx.callbackQueryData.args[0];

  const message = await CategoryService.categories(page);

  if (message.text) {
    ctx.editMessageText(message.text, { reply_markup: message.keyboard });
  } else {
    ctx.answerCallbackQuery("bu betda categorylar mavjud emas");
  }
}

export async function category(ctx: NewContext) {
  let [ID, page]: any = ctx.callbackQueryData.args;
  ID = +ID;
  page = +page;

  const message = await CategoryService.category(ID, page);

  if (message.text) {
    //ctx.editMessageText(message.text, { reply_markup: message.keyboard });
  } else {
    ctx.answerCallbackQuery("bu betda kitoblar mavjud emas");
  }
}
