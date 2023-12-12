import axios from "axios";
import { Composer, InlineKeyboard } from "grammy";
import { AuthGuard } from "../guards/auth.guard";
import { NewContext } from "../common/types/NewContext";
import { SaveService } from "../service/save.service";

export const saveHandler = new Composer<NewContext>();

saveHandler.on("callback_query:data", AuthGuard, async (ctx) => {
	if (ctx.callbackQueryData.type == "save") {
		const message = await SaveService.save(ctx.user.ID, +ctx.callbackQueryData.args[1]);
		if (message) {
			ctx.answerCallbackQuery("saved");
		}
	}
	if (ctx.callbackQueryData.type == "unsave") {
		const message = await SaveService.unsave(ctx.user.ID, +ctx.callbackQueryData.args[1]);

		if (message) {
			ctx.answerCallbackQuery("unsaved");
		}
	}

	if (ctx.callbackQueryData.type == "saves") {
		const message = await SaveService.getSaves(ctx.user.ID);

		message.keyboard.row().text("back", JSON.stringify(ctx.callbackQueryData.from));
	}
});

saveHandler.command("saves", AuthGuard, async (ctx) => {
	const saves = await SaveService.getSaves(ctx.user.ID);
	ctx.reply(saves.text, { reply_markup: saves.keyboard });
});
