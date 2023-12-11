import axios from "axios";
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

bookHandler.callbackQuery(/^books_/, async (ctx) => {
	const page = +ctx.callbackQuery.data.replace("books_", "");
	const message = await BookService.books(page);

	if (!message.text) return;

	ctx.editMessageText(message.text, { reply_markup: message.keyboard });
});

bookHandler.callbackQuery(/^book_/, async (ctx) => {
	const ID = +ctx.callbackQuery.data.replace("book_", "");
	const message = await BookService.book(ID);

	if (!message.text) return;

	ctx.editMessageText(message.text, { reply_markup: message.keyboard });
});
