import { User } from "./User.js";
import { $, DOM } from "./DOM.js";
import { createDeskTemplate, createContentDesk } from './elements.js'
import { API } from "./API.js"

export class Desks extends User {

   constructor(userId) {
      super(userId)
   }

   appendDesks() {
      if (this.desks.create.length) {
         this.desks.create.forEach(el => {
            const createTemplate = $(document.importNode(createDeskTemplate.$el.content, true));
            const title = createTemplate.find('[data-todo-title]');
            title.text(el.title);

            const desk = createTemplate.find('[data-todo-desc-content]');
            desk.text(el.desk);

            const userName = createTemplate.find('[data-todo-user]');
            userName.text(this.user.name);
            console.log(el.name)

            createContentDesk.append(createTemplate)
         })
      }
   }

   initialRender() {
      this.fetcher(() => API.getUser(this.userID),
      this.appendDesks.bind(this)
      )
   }
}