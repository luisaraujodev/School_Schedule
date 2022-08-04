<template>
  <div class="container-menu" :isCompact="menuCompact">
    <header>
      <img src="../assets/logo.png" alt="logo" />
      <div class="icon" icon="menu" @click="menuCompact = !menuCompact">
        <i></i>
      </div>
    </header>
    <ul>
      <li v-for="menu in listMenu" :key="menu.name">
        <div v-if="menu.group">
          <span v-if="!menuCompact">{{ menu.group }}</span>
          <div v-else class="ln-horizontal"></div>
        </div>
        <router-link
          v-for="(item, idxItem) in menu.itens"
          :key="idxItem"
          :title="item.name"
          :name="item.name"
          :to="item.url"
          :select="
            selectMenu.group == menu.group && selectMenu.name == item.name
          "
          @click="
            () => {
              this.selectMenu = { group: menu.group, name: item.name };
            }
          "
          ><div class="icon" :icon="item.icon">
            <i></i>
          </div>
          <label>{{ item.name }}</label>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable*/
import { Options, Vue } from "vue-class-component";

import populationMenu from "../data/GetMenuData.json";

import { typeMenu } from "@/types/menu";
import { typeTabs } from "@/types/tabs";

@Options({
  props: {
    eventUpdateNewTab: { type: Function },
    isSelectTabID: String,
  },
  data() {
    return {
      menuCompact: true,
      listMenu: [] as typeMenu[],
      selectMenu: { group: "", name: "" },
    };
  },
  created() {
    this.listMenu = populationMenu;
  },
  watch: {
    isSelectTabID() {
      this.selectMenu = this.isSelectTabID;
    },
  },
})
export default class Menu extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 16px;

    img {
      width: 28px;
      height: 28px;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    position: relative;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden scroll;
    height: 100%;
  }
}

ul::-webkit-scrollbar-thumb {
  background-color: transparent;
}

li {
  display: flex;
  flex-direction: column;
  user-select: none;
  padding: 0 2px 0 12px;

  div {
    margin: 4px 0;
    span {
      padding: 10px;
      font-size: var(--size-medium);
      font-weight: 600;
      opacity: 0.5;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  a {
    text-decoration: none;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: rgb(0, 0, 0, 0);
    border-radius: 4px;
    width: 100%;
    padding: 8px 16px;
    margin: 4px 0;
    font-weight: 500;
    font-size: var(--size-medium);
    color: var(--th-text-df);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    cursor: pointer;
    -webkit-user-drag: none;
    transition: color 0.1s, background-color 0.1s;

    label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
}

[theme="dark"] a:hover {
  color: var(--white);
  background-color: var(--th-hover);
  opacity: 1;
}

a:hover {
  color: var(--green);
  background-color: var(--hover-green);
  opacity: 1;

  .icon i {
    background-color: var(--green);
  }
}

a[select="true"] {
  color: var(--white);
  background-color: var(--green);
  pointer-events: none;
  cursor: default;

  .icon i {
    background-color: var(--white);
  }
}

.icon {
  display: flex;
  width: 16px;
  height: 16px;
  min-width: 16px;
  margin: 0 16px 0 0;
  i {
    height: 100%;
    width: 100%;
    background-color: var(--th-text-df);
  }
}

.icon[icon="home"] i {
  -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 4.399V5.5H0V4.399h11z' fill='%23000'/%3E%3C/svg%3E")
    no-repeat 50% 50%;
  mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 4.399V5.5H0V4.399h11z' fill='%23000'/%3E%3C/svg%3E")
    no-repeat 50% 50%;
}

.icon[icon="menu"] {
  width: 28px;
  height: 28px;
  margin-right: 0px;
  border-radius: 4px;
  i {
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 13 10' fill='none'%3E%3Crect width='12.33' height='1.33333' transform='matrix(-1 0 0 1 12.33 0)' fill='black'/%3E%3Crect width='12.33' height='1.33333' transform='matrix(-1 0 0 1 12.33 4.33334)' fill='black'/%3E%3Crect width='12.33' height='1.33333' transform='matrix(-1 0 0 1 12.33 8.66667)' fill='black'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 13 10' fill='none'%3E%3Crect width='12.33' height='1.33333' transform='matrix(-1 0 0 1 12.33 0)' fill='black'/%3E%3Crect width='12.33' height='1.33333' transform='matrix(-1 0 0 1 12.33 4.33334)' fill='black'/%3E%3Crect width='12.33' height='1.33333' transform='matrix(-1 0 0 1 12.33 8.66667)' fill='black'/%3E%3C/svg%3E")
      no-repeat 50% 50%;
  }

  :hover {
    background-color: var(--green);
  }
}

.ln-vertical {
  width: 2px;
  height: 100%;
  background-color: var(--th-text-df);
  border-radius: 4px;
  opacity: 0.6;
}

.ln-horizontal {
  width: 100%;
  height: 2px;
  margin: 4px 0;
  background-color: var(--th-text-df);
  border-radius: 4px;
  opacity: 0.15;
}

[isCompact="true"] {
  width: 60px;
  transition: width 0.2s;
  header {
    img {
      display: none;
    }
  }

  li {
    a {
      padding: 8px 0px;
      .icon {
        margin: 0 auto;
      }
      label {
        width: 0px;
        text-overflow: clip;
      }
    }
  }
}

[isCompact="false"] {
  width: 240px;
  transition: width 0.2s;
}
</style>
