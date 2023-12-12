import axios from "axios";
import { Composer } from "grammy";
import { AuthService } from "../service/auth.service";
import { NewContext } from "../common/types/NewContext";

export const authHandler = new Composer<NewContext>();

authHandler.on("callback_query:data", async (ctx) => {
	if (ctx.callbackQueryData.type == "register") {
		const username = ctx.callbackQueryData.args[0];

		const password = ctx.callbackQueryData.args[1];
		const telegramID = ctx.from?.id + "";

		const success = await AuthService.register(username, password, telegramID);
		if (success) {
			ctx.reply("registratsiyadan o'tdingiz");
		} else {
			ctx.reply("registratsiyadan o'tolmadingiz");
		}
	}
});
