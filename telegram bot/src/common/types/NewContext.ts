import { type ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";

export type NewContext = Context &
	SessionFlavor<{ page: number; categoryID: number }> &
	ConversationFlavor & {
		user: {
			ID: number;
			username: string;
			telegramID: string;
			password: string;
		};
		callbackQueryData: { type: string; args: any[]; from: {} };
	};
