import { User } from "./User.js";
import { createContentDesk, progressContentDesk, doneContentDesk } from './elements.js';
import { API } from "./API.js";
import { DesksLogic } from "./DesksLogic.js";
import { ERROR_FETCHING_USER } from './constants.js';

export class Desks extends User {

   constructor(userId) {
      super(userId)
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
      const {create, progress, done} = this.desks;

      if (create.length) {
         $logic.appendCreateTodos();
      }
      else {
         createContentDesk.insertHTML('afterbegin', `<p class="noTodos">No todos yet</p>`)
      }

      if (progress.length) {
         $logic.appendProgressTodos();
      }
      else {
         progressContentDesk.insertHTML('afterbegin', `<p class="noTodos">No todos yet</p>`)
      }

      if (done.length) {
         $logic.appendDoneTodos();
      }
      else {
         doneContentDesk.insertHTML('afterbegin', `<p class="noTodos">No todos yet</p>`)
      }
   }

   initialRender() {
      this.fetcher(() => API.getUser(this.userID),
      this.appendDesks.bind(this),
      ERROR_FETCHING_USER
      )
   }
}