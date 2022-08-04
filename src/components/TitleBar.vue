<template>
  <div class="titlebar">
    <div class="titlebar-menu">
      <img src="../assets/logo.png" alt="logo" />
      <nav @click="aciveMenu = true">
        <ul :active="aciveMenu">
          <li
            v-for="(menu, idx) in listMenu"
            :key="menu.label"
            :select="activeMenuItem == idx"
            @mouseover="activeMenuItem = idx"
          >
            <a :title="menu.label"
              >{{ menu.label }}
              <div class="dropdown-container dropdown-menu" v-if="menu.submenu">
                <li v-for="submenu in menu.submenu" :key="submenu.label">
                  <a :title="submenu.label" @click="submenu.click"
                    >{{ submenu.label || submenu.role }}
                    <span>{{ submenu.accelerator }}</span>
                    <div
                      class="icon-container"
                      icon="arrow"
                      @click="windowsActionMinimize"
                      v-if="submenu.submenu"
                    >
                      <i></i>
                    </div>
                    <div
                      class="dropdown-container dropdown-subMenu"
                      v-if="submenu.submenu"
                    >
                      <li v-for="sub in submenu.submenu" :key="sub.label">
                        <a
                          :title="sub.label"
                          target="_blank"
                          rel="noopener"
                          @click="sub.click"
                          >{{ sub.label || sub.role }}
                          <span>{{ sub.accelerator }}</span>
                        </a>
                      </li>
                    </div>
                  </a>
                </li>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="titlebar-title">{{ title }}</div>
    <div class="titlebar-windowsControl">
      <div class="titlebar-ln"></div>
      <div
        class="titlebar-icon icon-container"
        icon="minimize"
        @click="windowsActionMinimize"
      >
        <i></i>
      </div>
      <div
        class="titlebar-icon icon-container"
        icon="maximize"
        @click="windowsActionMaximize"
      >
        <i></i>
      </div>
      <div
        class="titlebar-icon icon-container"
        icon="close"
        @click="windowsActionClose"
      >
        <i></i>
      </div>
    </div>
    <div
      class="background-menu"
      @click="aciveMenu = false"
      v-if="aciveMenu"
    ></div>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";
import { Options, Vue } from "vue-class-component";
import MenuTemplate from "@/data/GetMenuTemplate";

@Options({
  data() {
    return {
      title: "",
      listMenu: [],
      aciveMenu: false,
      activeMenuItem: 0,
    };
  },
  created() {
    this.title = document.title;
    const newMenu = MenuTemplate;
    // eslint-disable-next-line array-callback-return
    newMenu.map((i: any) => {
      if (i.submenu) {
        // eslint-disable-next-line array-callback-return
        i.submenu.map((e: any) => {
          if (e.accelerator) {
            e.accelerator = String(e.accelerator).replace(
              "CommandOrControl",
              "Ctrl",
            );
          }
        });
      }
    });
    this.listMenu = newMenu;
  },
  methods: {
    windowsActionMinimize() {
      ipcRenderer.send("action-window", "minimize");
    },
    windowsActionMaximize() {
      ipcRenderer.send("action-window", "maximize");
    },
    windowsActionClose() {
      ipcRenderer.send("action-window", "close");
    },
  },
})
export default class Menu extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.titlebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  justify-content: space-between;
  background-color: var(--green);
  z-index: 99;
  -webkit-app-region: drag;
}

[theme="dark"] .titlebar {
  background-color: var(--th-background);
}

.titlebar > .titlebar-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-app-region: no-drag;

  nav {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  img {
    width: 18px;
    height: 18px;
    margin-left: 10px;
  }

  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0 16px;
    margin: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 9;
  }

  a {
    justify-content: space-between;
    background-color: rgb(0, 0, 0, 0);
    border-radius: 4px;
    width: 100%;
    height: auto;
    padding: 4px 10px 4px 10px;
    text-decoration: none;
    font-weight: 400;
    font-size: var(--size-medium);
    color: var(--white);
    position: relative;
    transition: color 0.2s, background-color 0.2s;
  }

  span {
    opacity: 0.65;
  }

  .dropdown-container {
    flex-direction: column;
    position: absolute;
    border: 1px solid;
    border-color: var(--th-border);
    min-width: 180px;
    padding: 1px 0;
    margin-top: 8px;
    margin-left: -10px;
    background-color: var(--th-background);
    z-index: 2;
    transition: display 0.2s;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: var(--th-text-df);
    }

    .icon-container {
      display: flex;
      width: 8px;
      height: 8px;

      i {
        height: 100%;
        width: 100%;
        background-color: var(--th-text-df);
      }
    }
  }

  .dropdown-menu {
    display: none;
  }

  .dropdown-subMenu {
    display: none;
    margin-top: 18%;
    margin-left: 90%;
  }

  ul[active="true"] li[select="true"] {
    > a {
      color: var(--white);
      background-color: var(--th-hover);
    }

    .dropdown-menu {
      display: flex;
      transition: all 0.2s;

      a {
        border-radius: 0;
      }
    }
  }

  .dropdown-menu li:hover {
    > a {
      color: var(--white);
      background-color: #1a8d5f;
    }

    span {
      opacity: 1;
    }

    .icon-container i {
      background-color: var(--white);
    }

    .dropdown-subMenu {
      display: flex;
      transition: all 0.2s;

      a {
        border-radius: 0;
      }
    }
  }
}

.titlebar-title {
  font-size: var(--size-normal);
  font-weight: 600;
  color: var(--white);
}

.titlebar-windowsControl {
  display: flex;
  flex-direction: row;
  width: 120px;
  height: 32px;
  -webkit-app-region: no-drag;

  .titlebar-icon {
    display: flex;
    height: 100%;
    width: 42px;

    i {
      height: 100%;
      width: 100%;
      background-color: #fff;
    }
  }

  .titlebar-icon:not([icon="close"]):hover {
    background-color: var(--th-hover);
  }

  .titlebar-icon[icon="close"]:hover {
    background-color: var(--hover-red);
  }
}

.background-menu {
  background-color: rgb(0, 0, 0, 0);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 32px;
  left: 0;
  z-index: 1;
}
</style>
