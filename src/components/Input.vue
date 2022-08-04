<template>
  <div class="input-container" :type="type">
    <div class="icon-container" :icon="icon" v-if="icon">
      <i></i>
    </div>
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="value"
      @keydown="keydown"
      @keyup="keyup"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-required="required"
      :style="icon ? 'padding: 0.6em 0.7em 0.6em 34px;' : ''"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    id: String,
    name: String,
    value: [String, Number],
    type: String,
    placeholder: String,
    required: Boolean,
    icon: String,
    keydown: { type: Function },
    keyup: { type: Function },
    disabled: { type: Boolean, default: false },
  },
})
export default class Input extends Vue {}
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
</style>
