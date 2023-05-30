import { clock } from './utils/clock.util.js'
import { API } from './API.js'
import { User } from './User.js';
import { Desks } from './Desks.js';

clock();
setInterval(clock, 1000);

new Desks(1).initialRender();

const user = {
      name: 'Mr. Anderson',
      avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/944.jpg',
      desks: {
        create: [
          {
            id: 3,
            title: 'JavaScript',
            desc: 'Learn JavaScript',
            date: ''
          },
          {
            id: 4,
            title: 'EventLoop',
            desc: 'Learn EventLoop',
            date: ''
          }
        ],
        progress: [
          {
            id: 2,
            title: 'SOLID',
            desc: 'Learn SOLID',
            date: ''
          }
        ],
        done: [
          {
            id: 0,
            title: 'HTML, CSS',
            desc: 'Learn TML, CSS',
            date: ''
          }
        ]
      },
      id: 1
    }

API.putUser(1, user);
