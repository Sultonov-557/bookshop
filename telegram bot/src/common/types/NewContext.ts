import { type ConversationFlavor } from "@grammyjs/conversations";
import { Context } from "grammy";

export type NewContext = Context &
	ConversationFlavor & {
		user: {
			ID: number;
			username: string;
			telegramID: string;
			password: string;
		};
		callbackQueryData: { type: string; args: any[]; from: {} };
	};
