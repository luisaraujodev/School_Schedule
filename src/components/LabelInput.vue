<template>
  <div
    class="label-container"
    :required="required"
    :style="width ? 'min-width:' + width : ''"
    :bold="bold"
  >
    <label>
      {{ name }}
    </label>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: String,
    bold: {
      type: Boolean,
      default: true,
    },
    required: Boolean,
    width: String,
  },
})
export default class Label extends Vue {}
</script>

<style scoped lang="scss">
.label-container {
  display: block;
  text-align: end;
  align-self: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  label {
    text-align: right;
    padding: 4px 8px 4px 0px;
    letter-spacing: 0.015em;
    font-size: 0.92rem;
    width: 100%;
    line-height: 1.25rem;
    word-break: break-all;
    word-wrap: break-word;
    color: var(--th-text-df);
  }
}

.label-container[bold="true"] {
  font-weight: 500;
}

.label-container[bold="false"] {
  font-weight: 400;
}

.label-container[required="true"] label::before {
  content: "*";
  padding: 0 2px;
  color: #e02424;
  font-size: 16px;
}
</style>
