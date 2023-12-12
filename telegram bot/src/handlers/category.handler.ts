import axios from "axios";
import { Composer, InlineKeyboard } from "grammy";
import { CategoryService } from "../service/category.service";
import { NewContext } from "../common/types/NewContext";

export const categoryHandler = new Composer<NewContext>();

categoryHandler.command("category", async (ctx) => {
	const message = await CategoryService.categories(1);

	if (message.text) {
		ctx.reply(message.text, { reply_markup: message.keyboard });
	} else {
		ctx.answerCallbackQuery("bu betda categorylar mavjud emas");
	}
});

categoryHandler.on("callback_query:data", async (ctx) => {
	if (ctx.callbackQueryData.type == "categories") {
		const page = +ctx.callbackQueryData.args[0];

		const message = await CategoryService.categories(page);

		if (message.text) {
			ctx.editMessageText(message.text, { reply_markup: message.keyboard });
		} else {
			ctx.answerCallbackQuery("bu betda categorylar mavjud emas");
		}
	}
	if (ctx.callbackQueryData.type == "category") {
		let [ID, page]: any = ctx.callbackQueryData.args;
		ID = +ID;
		page = +page;

		const message = await CategoryService.category(ID, page);

		if (message.text) {
			ctx.editMessageText(message.text, { reply_markup: message.keyboard });
		} else {
			ctx.answerCallbackQuery("bu betda kitoblar mavjud emas");
		}
	}
});
