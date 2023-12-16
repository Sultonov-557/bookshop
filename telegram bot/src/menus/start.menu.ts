import { Menu } from "@grammyjs/menu";

export const start = new Menu("start")
  .submenu("categorylar", "categories")
  .submenu("kitoblar", "books")
  .row()
  .back("Back");
