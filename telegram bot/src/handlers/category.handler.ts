import axios from "axios";
import { Composer, InlineKeyboard } from "grammy";
import { CategoryService } from "../service/category.service";

export const categoryHandler = new Composer();

categoryHandler.command("category", async (ctx) => {
	const message = await CategoryService.categories(1);

	if (message.text) {
		ctx.reply(message.text, { reply_markup: message.keyboard });
	} else {
		ctx.answerCallbackQuery("bu betda categorylar mavjud emas");
	}
});

categoryHandler.callbackQuery(/^categories_/, async (ctx) => {
	const page = +ctx.callbackQuery.data.replace("categories_", "");

	const message = await CategoryService.categories(page);

	if (message.text) {
		ctx.editMessageText(message.text, { reply_markup: message.keyboard });
	} else {
		ctx.answerCallbackQuery("bu betda categorylar mavjud emas");
	}
});

categoryHandler.callbackQuery(/^category_/, async (ctx) => {
	let [ID, page]: any = ctx.callbackQuery.data.replace("category_", "").split("_");
	ID = +ID;
	page = +page;

	const message = await CategoryService.category(ID, page);

	if (message.text) {
		ctx.editMessageText(message.text, { reply_markup: message.keyboard });
	} else {
		ctx.answerCallbackQuery("bu betda kitoblar mavjud emas");
	}
});
