<template>
  <div
    class="input-container"
    :type="type"
    @blur="() => this.openDropdown(false)"
  >
    <div class="icon-container" :icon="icon" v-if="icon">
      <i></i>
    </div>
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="getValueSelectOption"
      :readonly="readonly"
      @keydown="keydown"
      @keyup="keyup"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="icon ? 'padding: 0.6em 0.7em 0.6em 34px;' : ''"
      @click="openDropdown"
      :aria-selected="optionSelected"
      :aria-required="required"
    />
    <div class="icon-container" icon="arrow">
      <i></i>
    </div>
    <div
      class="dropdown"
      :open="dropdown.active"
      :style="`top:${dropdown.top};
      left:${dropdown.left};
      right:${dropdown.right};
      bottom:${dropdown.bottom};`"
    >
      <ul>
        <li
          v-for="(op, idx) in option"
          :key="idx"
          @click="
            () => {
              op.idx = idx;
              eventSelectOption(op);
            }
          "
          :select="op.selected"
        >
          {{ op.name }}
        </li>
      </ul>
    </div>
    <div
      class="dropdown-background"
      v-if="dropdown.active"
      @click="dropdown.active = false"
    ></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

export type tOption = {
  value: string;
  name: string;
  selected?: boolean;
};

@Options({
  props: {
    id: String,
    name: String,
    readonly: Boolean,
    option: Array,
    value: String,
    type: String,
    required: Boolean,
    placeholder: String,
    icon: String,
    eventSelect: { type: Function },
    keydown: { type: Function },
    keyup: { type: Function },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      error: "",
      dropdown: {
        active: false,
        top: "40px",
        left: "auto",
        right: "auto",
        bottom: "auto",
      },
      optionSelected: "",
      valueInput: "",
    };
  },
  methods: {
    openDropdown(e: any) {
      const { y, target } = e;
      const getMain = document.querySelector("main");

      if (target.parentElement && getMain?.scrollHeight) {
        const pp = target.parentElement;

        this.dropdown.top =
          y + pp.offsetHeight + 140 < getMain.scrollHeight ? `${40}px` : "auto";
        this.dropdown.bottom =
          y + pp.offsetHeight + 140 < getMain.scrollHeight ? "auto" : `${40}px`;

        this.dropdown.active = !this.dropdown.active;
      }
    },
    eventSelectOption(option: tOption) {
      this.optionSelected = option.value !== "-1" ? option.value : "";
      this.dropdown.active = false;
      this.valueInput = option.name;
      this.eventSelect(option);
    },
  },
  watch: {
    option() {
      this.optionSelected = "";
      this.valueInput = "";
    },
  },
  computed: {
    getValueSelectOption() {
      let selectValue;

      const optionSelected = this.option.filter(
        (i: tOption) => i.selected === true,
      );

      if (optionSelected.length > 0) {
        selectValue = optionSelected[0].name;
        this.valueInput = optionSelected[0].name;
        this.optionSelected = optionSelected[0].value;
      } else {
        selectValue = String(this.value).length > 0 ? this.value : "";
      }
      return selectValue;
    },
  },
})
export default class Select extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  input {
    width: 100%;
    height: 36px;
    padding: 0.6em 0.7em;
    font-size: var(--size-medium);
    font-weight: 400;
    line-height: 1.5;
    color: rgba(17, 24, 39, 1);
    outline: none;
    background: var(--th-body-bg);
    border: 1px solid;
    border-color: var(--th-border);
    border-radius: 4px;
    box-shadow: 0px 0px 5px rgb(26, 141, 95, 0);
    transition: all 0.2s ease;
  }
}

.input-container:focus-within i {
  background-color: var(--green);
}

.icon-container {
  display: flex;
  width: 18px;
  height: 18px;
  margin: 0 10px;
  position: absolute;
  i {
    height: 100%;
    width: 100%;
    background-color: #6d6d6d;
  }
}

.icon-container[icon="arrow"] {
  width: 8px;
  height: 8px;
  position: absolute;
  left: calc(100% - 26px);

  i {
    height: 100%;
    width: 100%;
    transform: rotate(0deg);
  }
}

input::placeholder {
  opacity: 0.8;
}

input:focus {
  border-color: var(--green);
  box-shadow: 0px 0px 5px rgb(26, 141, 95, 0.4);
  transition: all 0.2s ease;
}

input:disabled {
  opacity: 0.8;
  pointer-events: none;
  background: var(--th-tab-disable);
  transition: all 0.2s ease;
}

input[readonly="true"] {
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.dropdown {
  display: none;
  position: absolute;
  width: auto;
  min-width: 40px;
  max-height: 140px;
  font-size: 14px;
  margin-right: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: rgba(17, 24, 39, 1);
  outline: none;
  background: #fff;
  border: 1px solid;
  border-color: #dadce0;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgb(26, 141, 95, 0);
  overflow: auto;
  z-index: 99;
  transition: all 0.2s ease;

  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    display: block;
  }

  ul li {
    list-style-type: none;
    font-size: 14px;
    height: auto;
    min-height: 27px;
    align-items: center;
    color: rgb(44, 44, 44, 1);
    padding: 0.2em 0.7em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  ul li:hover {
    background-color: #1a8d5f;
    color: #fff;
    transition: all 0.2s ease;
  }

  ul li[select="true"] {
    background-color: #e8f3ef;
    color: #009160;
    font-weight: 500;
    transition: all 0.2s ease;
  }
}

.dropdown[open="true"] {
  display: block;
}

.dropdown-background {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  resize: both;
  overflow: hidden;
}
</style>
