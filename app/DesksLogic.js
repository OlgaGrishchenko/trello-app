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

export class DesksLogic {
    constructor(user) {
        this.user = user;
        this.desks = user.desks;
    }

    appendCreateTodos() {
        const { create } = this.desks;

        createDeskCount.text(create.length);

        create.forEach((el) => {
            const createTemplate = $(
                document.importNode(createDeskTemplate.$el.content, true)
            );
            const title = createTemplate.find("[data-todo-title]");
            title.text(el.title);

            const desk = createTemplate.find("[data-todo-desc-content]");
            desk.text(el.desc);

            const userName = createTemplate.find("[data-todo-user]");
            userName.text(this.user.name);

            const todoDate = createTemplate.find("[data-todo-date]");
            todoDate.text(el.date);

            createContentDesk.append(createTemplate);
        });
    }

    appendProgressTodos() {

      const { progress } = this.desks;

      progressDeskCount.text(progress.length);

         progress.forEach(el => {
            const progressTemplate = $(document.importNode(progressDeskTemplate.$el.content, true));
            const title = progressTemplate.find('[data-todo-title]');
            title.text(el.title);

            const desk = progressTemplate.find('[data-todo-desc-content]');
            desk.text(el.desc);

            const userName = progressTemplate.find('[data-todo-user]');
            userName.text(this.user.name);
            
            const todoDate = progressTemplate.find('[data-todo-date]');
            todoDate.text(el.date);

            progressContentDesk.append(progressTemplate)
         })
    }

    appendDoneTodos() {
      const { done } = this.desks;
      doneDeskCount.text(done.length);

         done.forEach(el => {
            const doneTemplate = $(document.importNode(doneDeskTemplate.$el.content, true));
            const title = doneTemplate.find('[data-todo-title]');
            title.text(el.title);

            const desk = doneTemplate.find('[data-todo-desc-content]');
            desk.text(el.desc);

            const userName = doneTemplate.find('[data-todo-user]');
            userName.text(this.user.name);
            
            const todoDate = doneTemplate.find('[data-todo-date]');
            todoDate.text(el.date);

            doneContentDesk.append(doneTemplate)
         })
   }
}
