import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { Context } from "grammy";

export type NewContext = Context & ConversationFlavor;
