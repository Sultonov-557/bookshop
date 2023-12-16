import { Menus } from "../menus";

export const CommonService = {
  start() {
    const text = "Salom botimizga hush kelibsiz";

    return { text, keyboard: Menus.start };
  },
};
