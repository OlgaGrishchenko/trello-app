import { Desks } from './Desks.js';
import { $ } from './DOM.js';

const clockLayout = $('[data-header-clock]');
const createDeskTemplate = $('[data-create-todo-template]');
const progressDeskTemplate = $('[data-progress-todo-template]');
const doneDeskTemplate = $('[data-done-todo-template]');

const createContentDesk = $('[data-create-desk-content]');


export {
   clockLayout,
   createDeskTemplate,
   progressDeskTemplate,
   doneDeskTemplate,
   createContentDesk
}