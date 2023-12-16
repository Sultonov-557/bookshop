import axios from "axios";
import { InlineKeyboard } from "grammy";
import { Menus } from "../menus";

export const CategoryService = {
  async categories(page: number) {
    const categories: any[] = (
      await axios.get("http://localhost:80/category", { params: { page } })
    ).data;

    if (categories.length == 0 || page <= 0) {
      return {};
    }

    return {
      text: "categorylar",
      categories,
      keyboard: Menus.categories,
      success: true,
    };
  },

  async category(ID: number, page: number) {
    if (page <= 0) {
      return {};
    }

    const books = (
      await axios.get(`http://localhost:80/book/`, {
        params: { category: ID, page },
      })
    ).data;

    if (books.length == 0) {
      return {};
    }

    return { text: "kitoblar:", books, keyboard: "TODO" };
  },
};
