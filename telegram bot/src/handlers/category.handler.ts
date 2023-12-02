import axios from "axios";
import { Composer } from "grammy";

export const categoryHandler = new Composer();

categoryHandler.command("categorys", async (ctx) => {
  const categorys = (await axios.get("http://localhost:80/category")).data;
  console.log(categorys);
});
