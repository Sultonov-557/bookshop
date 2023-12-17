import { Menu } from "@grammyjs/menu";
import { CategoryService } from "../service/category.service";
import { NewContext } from "../common/types/NewContext";
import { Menus } from "../menus";

export const category = new Menu<NewContext>("category")
	.dynamic(async (ctx, range) => {
		const message = await CategoryService.category(ctx.session.categoryID, ctx.session.page);
		if (!message.text) return;

		for (let book of message.books) {
			range.text(book.name, (ctx) => {});
		}
	})
	.row()
	.text("⬅️", (ctx) => {
		ctx.session.page -= 1;
		ctx.menu.update();
	})
	.dynamic((ctx, range) => {
		range.text(ctx.session.page + "", () => {});
	})
	.text("➡️", (ctx) => {
		ctx.session.page += 1;
		ctx.menu.update();
	});
