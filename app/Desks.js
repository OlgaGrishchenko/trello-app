import { API } from "./API.js";
import { DesksLogic } from "./DesksLogic.js";
import { User } from "./User.js";
import {
  createContentDesk,
  progressContentDesk,
  doneContentDesk,
  btnRemoveAll,
  btnAddTodo,
  headerUserName,
  headerAvatar,
} from "./elements.js";
import { ERROR_FETCHING_USER } from "./constants.js";

export class Desks extends User {
  constructor(userId) {
    super(userId);

    btnAddTodo.addEvent("click", () => {
      this.deskLogic().addNewTodo();
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
    headerUserName.text(this.user.name);
    headerAvatar.$el.src = this.user.avatar;

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

  render(id = this.userID) {
    this.fetcher(
      () => API.getUser(id),
      this.appendDesks.bind(this),
      ERROR_FETCHING_USER
    );
  }
}