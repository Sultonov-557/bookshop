import { Menu } from "@grammyjs/menu";
import { CategoryService } from "../service/category.service";
import { NewContext } from "../common/types/NewContext";

export const categories = new Menu<NewContext>("categories").dynamic(async (ctx, range) => {
	const message = await CategoryService.categories(1);
	if (!message.success) return;

	for (let category of message.categories) {
		//range.submenu(category.name, "category");
		range.text(category.name, (ctx) => {
			ctx.session.page = 1;
			ctx.session.categoryID = category.ID;
			ctx.menu.nav("category");
		});
	}
});
