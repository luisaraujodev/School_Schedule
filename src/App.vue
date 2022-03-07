<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
/* eslint-disable*/
import { Options, Vue } from "vue-class-component";
// import { CreateBaseJSONController } from "@/db/controllers/CreateBaseJSONController";

// import { createConnection, getRepository } from "typeorm";
// import { Post } from "./entity/Post.entity";
@Options({
  methods: {
    createJSON: async () => {
      // await createConnection({
      //   type: "sqlite",
      //   database: "database.sqlite",
      //   synchronize: true,
      //   logging: true,
      //   entities: [
      //     __dirname + "**/entity/*.js", // pass your entities in here
      //   ],
      // })
      //   .then((e: any) => {
      //     var post = {
      //       title: "post title",
      //       text: "post text",
      //     };
      //     return getRepository("Post").save(post);
      //   })
      //   .then(() => {
      //     console.log("Saved successfully!");
      //     return getRepository("Post").find();
      //   })
      //   .then((posts: any) => {
      //     console.log("Posts: ", posts);

      //     posts.forEach((post: any) => {
      //       console.log(post.id + ". " + post.title);
      //     });
      //   })
      //   .catch((error: any) => {
      //     console.error("Error: ", error);
      //   });
    },
  },
  mounted() {
    this.createJSON();
  },
})
export default class App extends Vue {}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
