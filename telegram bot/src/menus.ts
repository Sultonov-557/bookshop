import { start } from "./menus/start.menu";
import { categories } from "./menus/categories.menu";

export const Menus = { start, categories };
export const MenusArray = Object.values(Menus);

start.register([categories]);
