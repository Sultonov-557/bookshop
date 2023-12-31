import { Bot, session } from "grammy";
import { env } from "./config/env.config";
import { commonHandler } from "./handlers/common.handler";
import { categoryHandler } from "./handlers/category.handler";
import { bookHandler } from "./handlers/book.handler";
import { NewContext } from "./common/types/NewContext";
import { conversations, createConversation } from "@grammyjs/conversations";
import { NewBook } from "./conversations/newBook.conversation";
import { saveHandler } from "./handlers/save.handler";
import { authHandler } from "./handlers/auth.handler";
import { ErrorHandler } from "./handlers/error.handler";
import { MenusArray } from "./menus";

const bot = new Bot<NewContext>(env.TOKEN);

bot.use(
	session({
		initial() {
			return { };
		},
	})
);

bot.use(conversations());

for (let menu of MenusArray) {
	bot.use(menu);
}

bot.start({
	drop_pending_updates: true,
	onStart: () => {
		console.log("started");
	},
});

bot.use(createConversation(NewBook, "newBook"));

bot.use((ctx, next) => {
	if (ctx.callbackQuery?.data) {
		ctx.callbackQueryData = JSON.parse(ctx.callbackQuery.data);
	}
	next();
});

bot.use(authHandler);
bot.use(commonHandler);
bot.use(categoryHandler);
bot.use(bookHandler);
bot.use(saveHandler);

bot.catch(ErrorHandler);
