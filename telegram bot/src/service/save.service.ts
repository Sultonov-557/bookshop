import axios from "axios";
import { InlineKeyboard } from "grammy";

export const SaveService = {
  async save(userID: number, bookID: number) {
    const saveRes = await axios.post(`http://localhost/save/`, {
      userID,
      bookID,
    });

    if (saveRes.data.success) {
      return "saved";
    }
  },

  async getSaves(userID: number) {
    const savesReq = await axios.get("http://localhost:80/save", {
      params: { userID },
    });

    const keyboard = new InlineKeyboard();

    const saves = savesReq.data;

    for (let save of saves) {
      keyboard.text(save.book.name, `book_${save.book.ID}`);
    }

    return { text: "saqlangan kitoblar:", keyboard };
  },
};
