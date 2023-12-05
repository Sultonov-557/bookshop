import axios from "axios";
import { NewContext } from "../common/types/NewContext";
import { NewConversation } from "../common/types/NewConversation";

export async function NewBook(conversations: NewConversation, ctx: NewContext) {
  ctx.reply("kitob nomini kiriting");
  const name = await conversations.form.text();
  ctx.reply("kitob yozuvchisini kiriting");
  const author = await conversations.form.text();
  ctx.reply("kitob narxini kiriting");
  const price = await conversations.form.number();
  ctx.reply("kitob bo'limini kiriting kiriting");
  const category = await conversations.form.text();

  await axios.post("http://localhost:80/book", {
    name,
    author,
    price,
    category,
    filePath: "/",
  });
  
  ctx.reply("book created");
}
