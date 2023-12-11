import axios from "axios";
import { Composer } from "grammy";
import { AuthService } from "../service/auth.service";

export const authHandler = new Composer();

authHandler.hears(/^\/register (.+) (.+)/, async (ctx) => {
	const username = ctx.match[1];
	const password = ctx.match[2];
	const telegramID = ctx.from?.id + "";

	const success = await AuthService.register(username, password, telegramID);
	if (success) {
		ctx.reply("registratsiyadan o'tdingiz");
	} else {
		ctx.reply("registratsiyadan o'tolmadingiz");
	}
});
