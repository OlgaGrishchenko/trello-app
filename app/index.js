import { clock } from './utils/clock.util.js'
import { API } from './API.js'
import { User } from './User.js';
import { Desks } from './Desks.js';
import { headerTitle } from './elements.js';
import { Modal } from './Modal.js';

clock();
setInterval(clock, 1000);

const desks = new Desks(1);

headerTitle.addEvent('click', () => {
    Modal.addUsersListLayout(desks);
});

Modal.addUsersListLayout(desks);