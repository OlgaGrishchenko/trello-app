import { DOM } from "./DOM.js";
import { root } from "./elements.js";

export class Modal {
  static #errorLayout;
  static #loader;
  static #warningModal;
  static #newTodoLayout;
  static #usersForm;

  static addLoaderLayout() {
    const loaderLayout = DOM.create("div", "modal", "modal--toggle");
    loaderLayout.innerHTML(
      "afterbegin",
      `
        <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`
    );
    Modal.#loader = loaderLayout;

    root.insertElement("afterend", loaderLayout);
  }

  static removeLoaderLayout() {
    if (Modal.#loader) {
      Modal.#loader.remove();
    }
  }

  static addErrorLayout(message) {
    this.removeLoaderLayout();

    const errorElement = DOM.create("div", "modal", "modal--toggle", "error");

    errorElement.innerHTML("afterbegin", `<p>${message}</p>`);
    Modal.#errorLayout = errorElement;

    root.insertElement("afterend", errorElement);

    errorElement.addEvent("click", (e) => {
      if ("errorMessage" in e.target.dataset) return;
      Modal.#errorLayout.remove();
    });
  }

  static addWarningRemoveLayout(callback) {
    const warningElement = DOM.create("div", "modal", "modal--toggle");
    warningElement.innerHTML(
      "afterbegin",
      `
        <div class="modal__warning">
            <h3>Are you sure?</h3>
            <div>
                <button 
                    class="warning-buttons__cancel"
                    data-btn-cancel
                >Cancel</button>

                <button 
                class="warning-buttons__confirm"
                data-btn-confirm
                >Confirm</button>
            </div>
        </div>
    `
    );
    Modal.#warningModal = warningElement;

    warningElement.addEvent("click", (e) => {
      const $el = e.target;

      if ("btnCancel" in $el.dataset) {
        this.removeWarningLayout();
        return;
      }
      if ("btnConfirm" in $el.dataset) {
        callback();
        this.removeWarningLayout();
      }
    });

    root.insertElement("afterend", warningElement);
  }

  static removeWarningLayout() {
    if (Modal.#warningModal) {
      Modal.#warningModal.remove();
    }
  }

  static addWarningLimitLayout(limit = "") {
    const warningElement = DOM.create("div", "modal", "modal--toggle");
    warningElement.insertHTML(
      "afterbegin",
      `
        <div class="modal__warning">
            <h3>You can add only ${limit} todos to Progress desk</h3>

            <button 
                class="warning-buttons__confirm"
                data-btn-confirm
            >Confirm</button>
        </div>
    `
    );
    Modal.#warningModal = warningElement;

    warningElement.addEvent("click", (e) => {
      const $el = e.target;

      if ("btnConfirm" in $el.dataset) {
        this.removeWarningLayout();
      }
    });

    root.insertElement("afterend", warningElement);
  }
}
