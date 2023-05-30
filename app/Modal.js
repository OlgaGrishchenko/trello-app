import { DOM } from "./DOM.js";
import { root } from "./elements.js";

export class Modal {
  static #errorLayout;
  static #loader;
  static #warningModal;
  static #newTodoLayout;
  static #usersForm;

  static addErrorLayout(message) {
    const errorElement = DOM.create("div", "modal", "modal--toggle", "error");

    errorElement.innerHTML("afterbegin", `<p>${message}</p>`);
    Modal.#errorLayout = errorElement;

    root.insertElement("afterend", errorElement);

    errorElement.addEvent("click", (e) => {
      if ("errorMessage" in e.target.dataset) return;
      Modal.#errorLayout.remove();
    });
  }
}
