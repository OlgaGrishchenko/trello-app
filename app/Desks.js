import { User } from "./User.js";
import { createDeskTemplate, progressDeskTemplate, doneDeskTemplate, createDeskCount, progressDeskCount, doneDeskCount, createContentDesk, progressContentDesk, doneContentDesk } from './elements.js';
import { API } from "./API.js";
import { DesksLogic } from "./DesksLogic.js";

export class Desks extends User {

   constructor(userId) {
      super(userId)
   }

   deskLogic() {
      return new DesksLogic(this.user);
   } 

   appendDesks() {
      createContentDesk.clear();

      const $logic = this.deskLogic();
      const {create, progress, done} = this.desks;

      if (create.length) {
         $logic.appendCreateTodos();
      }
      else {
         createContentDesk.insertHTML('afterbegin', `<p>No todos</p>`)
      }

      if (progress.length) {
         $logic.appendProgressTodos();
      }
      else {
         progressContentDesk.insertHTML('afterbegin', `<p>No</p>`)
      }

      if (done.length) {
         $logic.appendDoneTodos();
      }
      else {
         doneContentDesk.insertHTML('afterbegin', `<p>No todos</p>`)
      }
   }

   initialRender() {
      this.fetcher(() => API.getUser(this.userID),
      this.appendDesks.bind(this)
      )
   }
}