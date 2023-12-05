import axios from "axios";
import { Composer, InlineKeyboard } from "grammy";

export const categoryHandler = new Composer();

categoryHandler.command("category", async (ctx) => {
  const categorys = (await axios.get("http://localhost:80/category")).data;
  const keyboard = new InlineKeyboard();

  for (let i of categorys) {
    keyboard.text(i.name, `category_${i.ID}_1`);
  }

  keyboard.row().text("⬅️").text("1").text("➡️", "categories_2");

  ctx.reply("categories:", { reply_markup: keyboard });
});

categoryHandler.callbackQuery(/^categories_/, async (ctx) => {
  const page = +ctx.callbackQuery.data.replace("categories_", "");
  const categories = (
    await axios.get("http://localhost:80/category", { params: { page } })
  ).data;

  const keyboard = new InlineKeyboard();

  for (let i of categories) {
    keyboard.text(i.name, `category_${i.ID}_1`);
  }

  keyboard
    .row()
    .text("⬅️", `categories_${page - 1}`)
    .text(page + "")
    .text("➡️", `categories_${page + 1}`);

  ctx.editMessageText("categories:", { reply_markup: keyboard });
});

categoryHandler.callbackQuery(/^category_/, async (ctx) => {
  let [ID, page]: any = ctx.callbackQuery.data
    .replace("category_", "")
    .split("_");
  ID = +ID;
  page = +page;

  const books = (await axios.get(`http://localhost:80/category/${ID}`)).data
    .books;

  const keyboard = new InlineKeyboard();

  let limit = 10;
  let offset = limit * (page - 1);
  for (let i of books) {
    if (offset <= 0) {
      keyboard.text(i.name, `book_${i.ID}`);
    }
    offset--;
  }

  keyboard
    .row()
    .text("⬅️", `category_${ID}_${page - 1}`)
    .text(page + "")
    .text("➡️", `category_${ID}_${page + 1}`);

  ctx.editMessageText("kitoblar:", { reply_markup: keyboard });
});
