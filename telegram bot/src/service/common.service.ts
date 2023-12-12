import { InlineKeyboard } from "grammy";

export const CommonService = {
	start() {
		const text = "Salom botimizga hush kelibsiz";
		const keyboard = new InlineKeyboard();

		keyboard.text("categorylar", "categories_1");
		keyboard.text("kitoblar", "books_1");

		return { text, keyboard };
	},
};
