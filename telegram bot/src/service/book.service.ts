import axios from "axios";
import { InlineKeyboard } from "grammy";

export const BookService = {
  async books(page: number) {
    const books = (
      await axios.get("http://localhost:80/book", { params: { page } })
    ).data;

    if (books.length == 0) {
      return {};
    }

    const keyboard = new InlineKeyboard();

    for (let i of books) {
      keyboard.text(i.name, JSON.stringify({ type: "book", args: [i.ID] }));
    }

    keyboard
      .row()
      .text("⬅️", JSON.stringify({ type: "books", args: [page - 1] }))
      .text(page + "")
      .text("➡️", JSON.stringify({ type: "books", args: [page + 1] }));

    return { text: "kitoblar:", keyboard };
  },
  async book(ID: number) {
    const book = (await axios.get(`http://localhost:80/book/${ID}`)).data;
    const keyboard = new InlineKeyboard();

    keyboard
      .text("save", JSON.stringify({ type: "save", args: [ID] }))
      .text("unsave", JSON.stringify({ type: "unsave", args: [ID] }));

    return {
      text: `nomi: ${book.name}\nyozuvchi: ${book.author}\nnarxi: ${book.price}`,
      keyboard,
    };
  },
};
