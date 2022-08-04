<template>
  <div id="nav" class="container">
    <header>
      <TitleBar />
    </header>
    <nav>
      <Menu/>
    </nav>
    <main>
      <router-view />
    </main>
    <footer>{{ dbInstitution }}</footer>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Options, Vue } from "vue-class-component";
import { v4 as uuidv4 } from "uuid";
import Menu from "@/components/Menu.vue";
import TitleBar from "@/components/TitleBar.vue";

@Options({
  components: {
    TitleBar,
    Menu,
  },
  data() {
    return {
      dbInstitution: "",
    };
  },
  methods: {},
  created() {
    this.dbInstitution = process.env.DB_INSTITUTION || "";
   // console.log("created", process.env.DB_INSTITUTION);
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
@import "./assets/svg.css";
// Theme light
@mixin theme-light {
  --th-background: #fff;
  --th-body-bg: #fcfcfc;
  --th-text-df: #161f38;
  --th-text-desc: #5f6368;
  --th-border: #dbe5e2;
  --th-hover: rgba(0, 0, 0, 0.1);
  //tab
  --th-tab-df: #f3f3f3;
  --th-tab-disable: #ebebeb;
  --th-tab-navegate: #fcfcfc;
  //shadow
  --box-shadow-green: 0px 0px 8px rgba(26, 141, 95, 0.4);
  --box-shadow-blue: 0px 0px 8px rgba(43, 91, 233, 0.4);
  --box-shadow-red: 0px 0px 8px rgba(224, 36, 36, 0.4);
}

// Theme dark
@mixin theme-dark {
  --th-background: #242625;
  --th-body-bg: #181a19;
  --th-text-df: #eee;
  --th-border: #252525;
  --th-hover: rgba(255, 255, 255, 0.1);
  //tab
  --th-tab-df: #181818;
  --th-tab-disable: #1d1d1d;
  --th-tab-navegate: #202020;
  //shadow
  --box-shadow-green: 0px 0px 10px rgba(26, 141, 95, 0.4);
}

:root {
  @include theme-light;
  --font-family: "Roboto", Helvetica, sans-serif;
  --green-active: #1a8d5f;
  --green: #168362;
  --green-light: #f4f8f7;
  --blue: #216ab5;
  --blue-light: #dee7ff;
  --red: #e02424;
  --red-light: #fde8e8;
  --white: #fff;
  --hover-red: rgba(232, 17, 35, 0.9);
  --hover-green: #e7f3ef;
  --size-small: 0.5rem;
  --size-medium: 0.875rem;
  --size-normal: 1rem;
  --size-large: 1.4rem;
  --size-xlarge: 2rem;
}

[theme="dark"] {
  @include theme-dark;
}

*,
::after,
::before {
  box-sizing: border-box;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

input.picker[type="date"] {
  position: relative;
}

::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: -22px;
  width: 32px;
  height: 100%;
  padding: 0;
  color: transparent;
  background: transparent;
}

::-webkit-scrollbar {
  background-color: var(--th-background);
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: var(--th-background);
}

::-webkit-scrollbar-thumb {
  background-color: var(--th-hover);
  border-radius: 16px;
  border: 2px solid var(--th-background);
  transition: all 0.2s;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--th-hover);
  transition: all 0.2s;
}

::-webkit-scrollbar-button {
  display: none;
}

body {
  margin: 0px;
  padding: 0px;
  font-family: var(--font-family);
  font-weight: normal;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  background-color: var(--th-body-bg);
  color: var(--th-text-df);
  height: 100vh;
}

p {
  font-size: var(--size-normal);
}

h1 {
  font-size: var(--size-xlarge);
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template:
    "head head" auto
    "nav main" 1fr
    "nav foot" 30px
    / auto 1fr;

  > header {
    grid-area: head;
  }

  > nav {
    background-color: var(--th-background);
    grid-area: nav;
    border-right: 1px solid;
    border-color: var(--th-border);
  }

  > main {
    grid-area: main;
    overflow: hidden;
  }

  > footer {
    grid-area: foot;
    border-top: 1px solid var(--th-border);
  } 
}
</style>
