import { createApp } from 'vue';
import { createConnectionDB } from "@/database/index";
import App from './App.vue';
import router from './router';
// import { CreateGridTimeController } from './database/controllers/CreateGridTimeController';

// verify exist

// connect dataBase
createConnectionDB()
  .then((e) => {
    console.log("main Sucesso!", e);
    // const createGridWeekController = new CreateGridTimeController();
    // createGridWeekController.handle({ name: "Aula 1", position: 0 });
    // createGridWeekController.handle({ name: "Aula 2", position: 1 });
    // createGridWeekController.handle({ name: "Aula 3", position: 2 });
    // createGridWeekController.handle({ name: "Aula 4", position: 3 });
    // createGridWeekController.handle({ name: "Aula 5", position: 4 });
    createApp(App).use(router).mount('#app');
  })
  .catch((error: any) => {
    console.log("main erro", error);
  });
