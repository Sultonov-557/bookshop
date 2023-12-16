import { Menu } from "@grammyjs/menu";
import { CategoryService } from "../service/category.service";

export const categories = new Menu("categories").dynamic(async (ctx, range) => {
  const message = await CategoryService.categories(1);
  if (!message.success) return;

  for (let category of message.categories) {
    range.submenu(category.name, "category");
  }
});
