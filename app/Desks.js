import { API } from "./API.js";
import { DesksLogic } from "./DesksLogic.js";
import { User } from "./User.js";
import {
  createContentDesk,
  progressContentDesk,
  doneContentDesk,
  btnRemoveAll,
  btnAddTodo,
} from "./elements.js";
import { ERROR_FETCHING_USER } from "./constants.js";

export class Desks extends User {
  constructor(userId) {
    super(userId);

    btnAddTodo.addEvent("click", () => {
      console.log("dsfsd");
    });

    btnRemoveAll.addEvent("click", () => {
      this.deskLogic().removeAll();
    });
  }

  clearDesks() {
    createContentDesk.clear();
    progressContentDesk.clear();
    doneContentDesk.clear();
  }

  deskLogic() {
    return new DesksLogic(
      this.user,
      this.fetcher.bind(this),
      this.appendDesks.bind(this)
    );
  }

  appendDesks() {
    this.clearDesks();

    const $logic = this.deskLogic();
    $logic.appendCreateTodos();
    $logic.appendProgressTodos();
    $logic.appendDoneTodos();
  }

  initialRender() {
    this.fetcher(
      () => API.getUser(this.userID),
      this.appendDesks.bind(this),
      ERROR_FETCHING_USER
    );
  }
}

