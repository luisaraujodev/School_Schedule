<template>
  <div class="home">
    <button @click="createJSON"></button>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";
/*
import { Post } from "../entity/Post.entity";
import { createConnection, getRepository } from "typeorm";
*/

// interface IWindow extends Window = {
//   remote?: {
//     minimize?(): void;
//   };
// };

@Options({
  components: {
    HelloWorld,
  },
  methods: {
    createJSON: async () => {
      // eslint-disable-next-line new-cap
      // const result = createService.execute({ name: "luis" });
      // console.log(result);


      (window as any).remote.minimize();
    },
  },
  mounted() {
    console.log("a");
    setTimeout(() => {
      // this.createJSON();
      console.log("t");
    }, 5000);
    console.log("b");
  },
})
export default class Home extends Vue {}
</script>
