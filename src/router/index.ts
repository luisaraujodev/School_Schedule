import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

import Schedule from "@/views/Schedule/Index.vue";
import Time from "@/views/Time.vue";
import Shift from "@/views/Shift.vue";
import Teaching from "@/views/Teaching.vue";
import Subjects from "@/views/Subjects.vue";
import Teachers from "@/views/Teachers.vue";
import Series from "@/views/Series.vue";
import Team from "@/views/Team/Index.vue";
import modeCanvas from "@/views/modeCanvas/Index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/schedule',
    name: 'Cronograma Escolar',
    component: Schedule,
  },
  // {
  //   path: '/',
  //   name: 'Consultar Horário',
  //   component: Time,
  // }
  {
    path: '/',
    name: 'Canvas',
    component: modeCanvas,
  }, {
    path: '/Shift',
    name: 'Consultar Turmo',
    component: Shift,
  },
  {
    path: '/Teaching',
    name: 'Consultar Ensino/Curso',
    component: Teaching,
  },
  {
    path: '/Subjects',
    name: 'Consultar Disciplinas',
    component: Subjects,
  }, {
    path: '/Teachers',
    name: 'Consultar Professores',
    component: Teachers,
  }, {
    path: '/Series',
    name: 'Consultar Série ou Módulo',
    component: Series,
  }, {
    path: '/Team',
    name: 'Consultar Turmas',
    component: Team,
  },
];

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes,
});

export default router;
