import { Menu } from "@grammyjs/menu";
import { CategoryService } from "../service/category.service";
import { NewContext } from "../common/types/NewContext";

export const category = new Menu<NewContext>("categories").dynamic(
  (ctx, range) => {
    
  }
);
