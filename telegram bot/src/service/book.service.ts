import axios from "axios";
import { InlineKeyboard } from "grammy";

export const BookService = {
	async books(page: number) {
		const books = (await axios.get("http://localhost:80/book", { params: { page } })).data;

		if (books.length == 0) {
			return {};
		}

		const keyboard = new InlineKeyboard();

		for (let i of books) {
			keyboard.text(i.name, `book_${i.ID}`);
		}

		keyboard
			.row()
			.text("⬅️", `books_${page - 1}`)
			.text(page + "")
			.text("➡️", `books_${page + 1}`);

		return { text: "kitoblar:", keyboard };
	},
	async book(ID: number) {
		const book = (await axios.get(`http://localhost:80/book/${ID}`)).data;
		const keyboard = new InlineKeyboard();

		keyboard.text("save", `save_${ID}`).text("unsave", `unsave_${ID}`);

		return { text: `nomi: ${book.name}\nyozuvchi: ${book.author}\nnarxi: ${book.price}`, keyboard };
	},
};
