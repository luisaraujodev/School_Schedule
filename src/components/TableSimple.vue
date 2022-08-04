<template>
  <form class="table-container" @submit="checkForm" method="post" :id="id">
    <div class="title-container" v-if="title">
      <span>{{ title }}</span>
    </div>
    <div class="table-content">
      <table>
        <slot />
      </table>
    </div>
  </form>
</template>

<script lang="ts">
/* eslint-disable*/
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    id: String,
    title: String,
    clickbtnSubmit: { type: Function },
  },
})
export default class TableSimple extends Vue {}
</script>

<style lang="scss">
.table-container {
  overflow: unset;

  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-container span {
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.45rem;
    padding: 16px 0px 8px;
    -webkit-hyphens: auto;
    word-break: break-word;
    word-wrap: break-word;
    color: #1a8d5f;
  }
}

.table-action {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;
}

.table-content {
  display: flex;
  flex-direction: column;
  width: 1fr;
  height: auto;
  margin: 4px 0;
  
  table {
    width: auto;
    height: auto;
    border-collapse: collapse;
    border: 0;
    background-color: var(--th-background);

    thead tr {
      background-color: rgba(255, 255, 255);
    }

    th {
      text-align: start;
    }

    tr:first-child {
      border-bottom: 1px solid;
      border-color: #dadce0;
    }

    td,
    th {
      border-bottom: 1px solid;
      border-color: #dadce0;
      margin: 0;
      padding: 8px 16px;
    }

    th {
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    td {
      font-size: 0.89rem;
      white-space: nowrap;
      /*overflow: hidden;*/
      text-overflow: ellipsis;
    }

    tr {
      cursor: default;
    }

    tr:not([select="true"]):nth-child(even) {
      background-color: #f2f2f2;
    }

    tr[select="true"] {
      font-weight: 500;
      color: #008357;
      background-color: #c7e2d8;
    }

    tr:not([select="true"]):hover {
      background-color: #f4f8f7;
    }

    tr:not([select="true"]):nth-child(even):hover {
      background-color: #e0e6e4;
    }

    tr[active] {
      background-color: #d1e8df;
      color: #1a8d5f;
      font-weight: 500;
    }
  }
}
</style>
