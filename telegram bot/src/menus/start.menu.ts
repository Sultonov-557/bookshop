import { Menu } from "@grammyjs/menu";
import { NewContext } from "../common/types/NewContext";

export const start = new Menu<NewContext>("start", {
	onMenuOutdated: (ctx) => {
		ctx.deleteMessage();
	},
})
	.submenu("categorylar", "categories")
	.submenu("kitoblar", "books")
	.row()
	.back("Back");
