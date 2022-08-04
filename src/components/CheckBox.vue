<template>
  <div class="container-checkbox">
    <input
      type="checkbox"
      :id="id"
      :checked="value"
      :name="name"
      :complement="complement"
      :disabled="disabled"
    />
    <label
      :for="id"
      @click="eventCheckBox"
      :disabled="disabled"
      :title="title"
    ></label>
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import { Options, Vue } from "vue-class-component";

export type checkBox_type = {
  id: string;
  isChecked: boolean;
  name: string;
  complement: string;
};

@Options({
  name: "CheckBox",
  props: {
    id: String,
    value: Boolean,
    name: String,
    label: String,
    title: String,
    complement: String,
    event: { type: Function },
    disabled: Boolean,
  },
  data() {
    return {
      tableId: "",
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    console.log(this.tableId);
    // this.tableId = this.id || uuidv4();
  },
  methods: {
    eventCheckBox(e: any) {
      const getInput = e.toElement.control;
      const checkBox: checkBox_type = {
        id: this.id,
        isChecked: !getInput.checked,
        name: this.name,
        complement: this.complement,
      };
      this.event(checkBox);
    },
  },
})
export default class Table extends Vue {}
</script>

<style scoped>
.container-checkbox {
  display: flex;
  align-items: center;
  width: auto;
  height: auto;
}

label {
  display: inline;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  border: 1px solid;
  border-color: #dadce0;
  box-shadow: 0px 0px 10px rgb(26, 141, 95, 0);
  width: 18px;
  height: 18px;
  min-width: 18px;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  position: relative;
  transition: all 0.2s;
}

label[disabled="false"] {
  background-color: #fafafa;
}

label[disabled="true"] {
  background-color: #c6c8cc;
  pointer-events: none;
}

label[disabled="true"]:after {
  content: "\2714";
  font-size: 0.88rem;
  font-weight: bold;
  position: absolute;
  top: 0px;
  left: 2px;
  color: var(--white);
  transition: all 0.2s;
}

input[type="checkbox"] + label:hover {
  border-color: rgb(1, 176, 117);
  box-shadow: 0px 0px 5px rgb(26, 141, 95, 0.4);
  transition: all 0.2s;
}

input[type="checkbox"] + label:active,
input[type="checkbox"]:checked + label:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(2px);
  transition: all 0.2s;
}

input[type="checkbox"]:checked + label {
  border-color: #1a8d5f;
  background-color: #1a8d5f;
  transition: all 0.2s;
}

input[type="checkbox"]:checked + label:after {
  content: "\2714";
  font-size: 0.88rem;
  font-weight: bold;
  position: absolute;
  top: 0px;
  left: 2px;
  color: #fff;
  transition: all 0.2s;
}

span {
  padding-left: 8px;
  text-align: left;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  overflow: hidden;
  white-space: nowrap;
}
</style>
