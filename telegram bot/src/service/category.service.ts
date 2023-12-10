import axios from "axios";
import { InlineKeyboard } from "grammy";

export const CategoryService = {
	async categories(page: number) {
		const categories = (await axios.get("http://localhost:80/category", { params: { page } })).data;

		if (categories.length == 0 || page <= 0) {
			return {};
		}

		const keyboard = new InlineKeyboard();

		for (let i of categories) {
			keyboard.text(i.name, `category_${i.ID}_1`);
		}

		keyboard
			.row()
			.text("⬅️", `categories_${page - 1}`)
			.text(page + "")
			.text("➡️", `categories_${page + 1}`);

		return { text: "categorylar", keyboard, success: true };
	},

	async category(ID: number, page: number) {
		if (page <= 0) {
			return {};
		}

		const books = (await axios.get(`http://localhost:80/book/`, { params: { category: ID, page } })).data;

		if (books.length == 0) {
			return {};
		}

		const keyboard = new InlineKeyboard();

		for (let i of books) {
			keyboard.text(i.name, `book_${i.ID}`);
		}

		keyboard
			.row()
			.text("⬅️", `category_${ID}_${page - 1}`)
			.text(page + "")
			.text("➡️", `category_${ID}_${page + 1}`);

		return { text: "kitoblar:", keyboard };
	},
};
