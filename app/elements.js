import { Desks } from './Desks.js';
import { $ } from './DOM.js';

const clockLayout = $('[data-header-clock]');
const createDeskTemplate = $('[data-create-todo-template]');
const progressDeskTemplate = $('[data-progress-todo-template]');
const doneDeskTemplate = $('[data-done-todo-template]');

const createDeskCount = $('[data-desk-create-count]');
const progressDeskCount = $('[data-desk-progress-count]');
const doneDeskCount = $('[data-desk-done-count]');

const createContentDesk = $('[data-create-desk-content]');
const progressContentDesk = $('[data-progress-desk-content]');
const doneContentDesk = $('[data-done-desk-content]');

export {
   clockLayout,
   createDeskTemplate,
   progressDeskTemplate,
   doneDeskTemplate,
   createDeskCount,
   progressDeskCount,
   doneDeskCount,
   createContentDesk,
   progressContentDesk,
   doneContentDesk
}