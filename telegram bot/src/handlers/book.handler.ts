import axios from "axios";
import { Composer, InlineKeyboard } from "grammy";

export const bookHandler = new Composer();

bookHandler.command("books", async (ctx) => {
  const books = (await axios.get("http://localhost:80/book")).data;
  const keyboard = new InlineKeyboard();

  for (let i of books) {
    keyboard.text(i.name, `book_${i.ID}`);
  }

  keyboard.row().text("⬅️").text("1").text("➡️", "books_2");

  ctx.editMessageText("kitoblar:", { reply_markup: keyboard });
});

bookHandler.callbackQuery(/^books_/, async (ctx) => {
  const page = +ctx.callbackQuery.data.replace("books_", "");
  console.log(page);
  const books = (
    await axios.get("http://localhost:80/book", { params: { page } })
  ).data;

  const keyboard = new InlineKeyboard();

  for (let i of books) {
    keyboard.text(i.name, `book_${i.ID}`);
  }

  keyboard
    .row()
    .text("⬅️", `books_${page - 1}`)
    .text(page + "")
    .text("➡️", `books_${page + 1}`);

  ctx.reply("kitoblar:", { reply_markup: keyboard });
});

bookHandler.callbackQuery(/^book_/, async (ctx) => {
  const ID = +ctx.callbackQuery.data.replace("book_", "");
  console.log(ID);
  const book = (await axios.get(`http://localhost:80/book/${ID}`)).data;

  ctx.reply(
    `nomi: ${book.name}\nyozuvchi: ${book.author}\nnarxi: ${book.price}`
  );
});
