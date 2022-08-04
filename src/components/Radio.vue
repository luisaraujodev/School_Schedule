<template>
  <div class="container-radio">
    <input type="radio" :id="value" :name="name" />
    <label :for="value" @click="eventradio" :disabled="disabled"></label>
  </div>
</template>

<script>
export default {
  name: "radio",
  props: {
    name: String,
    value: String,
    event: { type: Function },
    disabled: Boolean,
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    eventradio(e) {
      const getInput = e.toElement.control;

      const radio = {
        isChecked: !getInput.checked,
        id: this.value,
      };

      this.event(radio);
    },
  },
};
</script>

<style scoped>
.container-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
}

label {
  display: inline;
  cursor: pointer;
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + label {
  border: 1px solid;
  border-color: #dadce0;
  box-shadow: 0px 0px 10px rgb(26, 141, 95, 0);
  width: 18px;
  height: 18px;
  border-radius: 20px;
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
  cursor: none;
  opacity: 0.5;
}

label[disabled="true"]:after {
  content: "";
  color: #fff;
  display: flex;
  width: 10px;
  height: 10px;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 20px;
  background: rgb(128, 128, 128);
  transition: all 0.2s;
}

input[type="radio"] + label:hover {
  border-color: rgb(1, 176, 117);
  box-shadow: 0px 0px 5px rgb(26, 141, 95, 0.4);
  transition: all 0.2s;
}

input[type="radio"] + label:active,
input[type="radio"]:checked + label:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(2px);
  transition: all 0.2s;
}

input[type="radio"]:checked + label {
  border-color: #1a8d5f;
  background-color: #1a8d5f;
  transition: all 0.2s;
}

input[type="radio"]:checked + label:after {
  content: "";
  color: #fff;
  display: flex;
  width: 10px;
  height: 10px;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 20px;
  background: #fff;
  transition: all 0.2s;
}
</style>
