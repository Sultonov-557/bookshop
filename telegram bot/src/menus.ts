import { start } from "./menus/start.menu";
import { categories } from "./menus/categories.menu";
import { category } from "./menus/category.menu";

export const Menus = { start, categories, category };
export const MenusArray = Object.values(Menus);

start.register([categories]);
categories.register([category]);
