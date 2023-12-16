import { Composer, InlineKeyboard } from "grammy";
import { NewContext } from "../common/types/NewContext";
import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { BookService } from "../service/book.service";

export const bookHandler = new Composer<NewContext>();

bookHandler.command("books", async (ctx) => {
  const message = await BookService.books(1);

  if (!message.text) return;

  ctx.reply(message.text, { reply_markup: message.keyboard });
});

bookHandler.command("newbook", AuthGuard, AdminGuard, (ctx) => {
  ctx.conversation.enter("newBook");
});

bookHandler.on("callback_query:data", async (ctx) => {
  if (ctx.callbackQueryData.type == "books") {
    const page = +ctx.callbackQueryData.args[0];
    const message = await BookService.books(page);

    if (!message.text) return;

    ctx.editMessageText(message.text, { reply_markup: message.keyboard });
  }

  if (ctx.callbackQueryData.type == "book") {
    const ID = +ctx.callbackQueryData.args[0];
    const message = await BookService.book(ID);

    if (!message.text) return;

    ctx.editMessageText(message.text, { reply_markup: message.keyboard });
  }
});
