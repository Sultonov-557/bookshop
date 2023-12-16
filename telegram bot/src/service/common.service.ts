import { InlineKeyboard } from "grammy";

export const CommonService = {
  start() {
    const text = "Salom botimizga hush kelibsiz";
    const keyboard = new InlineKeyboard();

    keyboard.text(
      "categorylar",
      JSON.stringify({ type: "categories", from: { type: "start" }, args: [1] })
    );
    keyboard.text(
      "kitoblar",
      JSON.stringify({ type: "books", from: { type: "start" }, args: [1] })
    );

    return { text, keyboard };
  },
};
