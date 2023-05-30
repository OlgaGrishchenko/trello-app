import {
  createDeskTemplate,
  progressDeskTemplate,
  doneDeskTemplate,
  createDeskCount,
  progressDeskCount,
  doneDeskCount,
  createContentDesk,
  progressContentDesk,
  doneContentDesk,
} from "./elements.js";
import { $ } from "./DOM.js";
import { getDate } from "./utils/date.utils.js";
import { API } from "./API.js";
import { ERROR_WHILE_MOVING, ERROR_WHILE_REMOVING } from "./constants.js";

export class DesksLogic {
  constructor(user, fetcher, appendDesks) {
    this.user = user;
    this.desks = user.desks;
    this.ID = user.id;
    this.fetcher = fetcher;
    this.appendDesks = appendDesks;
  }

  applyContent(el, template) {
    const title = template.find("[data-todo-title]");
    title.text(el.title);

    const desc = template.find("[data-todo-desc-content]");
    desc.text(el.desc);

    const userName = template.find("[data-todo-user]");
    userName.text(this.user.name);

    const todoDate = template.find("[data-todo-date]");
    todoDate.text(el.date);
  }

  putFetcher(desks, errorMessage = "") {
    this.fetcher(
      () => API.putUser(this.ID, { desks }),
      this.appendDesks,
      errorMessage
    );
  }

  appendCreateTodos() {
    const { create } = this.desks;

    createDeskCount.text(create.length);

    create.forEach((el) => {
      const createTemplate = $(
        document.importNode(createDeskTemplate.$el.content, true)
      );
      this.applyContent(el, createTemplate);

      const btnMove = createTemplate.find("[data-todo-btn-move]");

      btnMove.addEvent("click", () => {
        const create = this.desks.create.filter((todo) => todo.id !== el.id);
        const progress = [...this.desks.progress, el];
        const newDesks = { ...this.desks, create, progress };

        this.putFetcher(newDesks, ERROR_WHILE_MOVING);
      });

      const btnRemove = createTemplate.find("[data-todo-btn-remove]");
      btnRemove.addEvent('click', () => this.removeTodo('create', el));

      createContentDesk.append(createTemplate);
    });
  }

  appendProgressTodos() {
    const { progress } = this.desks;

    progressDeskCount.text(progress.length);

    progress.forEach((el) => {
      const progressTemplate = $(
        document.importNode(progressDeskTemplate.$el.content, true)
      );
      this.applyContent(el, progressTemplate);

      const btnMove = progressTemplate.find("[data-todo-btn-move]");

      btnMove.addEvent("click", () => {
        const progress = this.desks.progress.filter(
          (todo) => todo.id !== el.id
        );
        const done = [...this.desks.done, el];
        const newDesks = { ...this.desks, progress, done };

        this.putFetcher(newDesks, ERROR_WHILE_MOVING);
      });

      const btnBack = progressTemplate.find("[data-todo-btn-back]");
      btnBack.addEvent("click", () => {
        const progress = this.desks.progress.filter(
          (todo) => todo.id !== el.id
        );
        const create = [...this.desks.create, el];
        const newDesks = { ...this.desks, create, progress };

        this.putFetcher(newDesks, ERROR_WHILE_MOVING);
      });

      const btnRemove = progressTemplate.find("[data-todo-btn-remove]");
      btnRemove.addEvent('click', () => this.removeTodo('progress', el));

      progressContentDesk.append(progressTemplate);
    });
  }

  appendDoneTodos() {
    const { done } = this.desks;
    doneDeskCount.text(done.length);

    done.forEach((el) => {
      const doneTemplate = $(
        document.importNode(doneDeskTemplate.$el.content, true)
      );

      this.applyContent(el, doneTemplate);

      const btnRemove = doneTemplate.find("[data-todo-btn-remove]");
      btnRemove.addEvent('click', () => this.removeTodo('done', el));

      doneContentDesk.append(doneTemplate);
    });
  }

  removeTodo(deskType, el) {
    const newTodo = this.desks[deskType].filter((todo) => todo.id !== el.id);
    const newDesks = { ...this.desks, [deskType]: newTodo };
    this.putFetcher(newDesks, ERROR_WHILE_REMOVING);
  }
}
