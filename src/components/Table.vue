<template>
  <form
    class="table-container"
    action=""
    @submit="checkForm"
    method="post"
    :id="id"
  >
    <div class="title-container" v-if="title">
      <span>{{ title }}</span>
    </div>
    <div class="table-action">
      <Input
        placeholder="Filtrar resultados"
        style="width: 30%"
        type="text"
        icon="search"
        :keyup="eventInputSearchKeyup"
        :disabled="!rows.length > 0"
      />
      <slot />
    </div>
    <div
      class="table-content"
      v-if="rows.length > 0"
      :style="'min-height:' + limitHeight"
    >
      <table>
        <thead>
          <tr>
            <th style="width: 35px; padding: 0 0 0 10px">
              <Radio :disabled="true" />
            </th>
            <th
              v-for="columns in dataColumns"
              :key="columns.name"
              :style="columns.style"
            >
              {{ columns.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, idx) in rows"
            :key="row.id"
            :select="isAtualRadio.id == row.id && isAtualRadio.isChecked"
            v-show="filterRecordsIsSearchIsPagination(row, idx)"
            @click="eventSelectTable(idx, row.id)"
          >
            <td v-if="radio" style="padding: 0 0 0 10px">
              <Radio
                :value="row.id"
                :name="'radio' + idTable"
                :event="() => {}"
              />
            </td>
            <td
              v-for="(item, idx, n) in row"
              :key="item"
              :col="idx"
              :style="dataColumns[n].style"
            >
              {{ item }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="msg-erro" s>
      <span> Não foi encontrado nenhum registro para sua consulta. </span>
    </div>
    <div class="table-navigate" v-if="!search">
      <div class="selectOptionRegister">
        <Label name="Exibir" width="auto" :bold="false" />
        <Select
          style="width: 60px"
          :readonly="true"
          :value="limitRows"
          :option="limitRowsOption"
          :disabled="!rows.length > 0"
          :eventSelect="eventSelectLimit"
        />
        <Label name="registros por página" width="auto" :bold="false" />
      </div>
      <div class="fullPageRow">
        <span
          >{{ isSelectPage.inicioPage }} -
          {{
            isSelectPage.endPage > rows.length
              ? rows.length
              : isSelectPage.endPage
          }}
          de {{ rows.length }} registro</span
        >
      </div>
      <div class="navigate-control">
        <div
          class="icon-container"
          icon="back"
          @click="navigateBack"
          :disabled="isSelectPage.inicioPage - 1 == 0"
        >
          <i></i>
        </div>
        <div
          class="icon-container"
          icon="next"
          @click="navigateNext"
          :disabled="isSelectPage.endPage + 1 >= rows.length"
        >
          <i></i>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
/* eslint-disable*/
import { Options, Vue } from "vue-class-component";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input.vue";
import Select from "./Select.vue";
import Radio from "./Radio.vue";
import Label from "./LabelInput.vue";

@Options({
  components: {
    Input,
    Select,
    Label,
    Radio,
  },
  props: {
    id: Number,
    title: String,
    allRadio: {
      type: Boolean,
      default: false,
    },
    radio: {
      type: Boolean,
      default: false,
    },
    dataColumns: {
      type: Array,
      default: [],
    },
    dataRows: {
      type: Array,
      default: [],
    },
    clickbtnSubmit: { type: Function },
  },
  data() {
    return {
      idTable: "",
      search: "",
      isSelectPage: {
        totalPage: 10,
        inicioPage: 1,
        endPage: 10,
      },
      isAtualRadio: { id: "", isChecked: false },
      limitRowsOption: [
        { value: 10, name: "10", active: true },
        { value: 20, name: "20" },
        { value: 30, name: "30" },
        { value: 40, name: "40" },
        { value: 50, name: "50" },
      ],
      limitRows: "10",
      limitHeight: "380px",
      rows: [],
      columns: [],
    };
  },
  methods: {
    checkForm(event: any) {
      event?.preventDefault();
      this.clickbtnSubmit(event);
    },
    eventInputSearchKeyup(event: KeyboardEvent) {
      const { target } = event;
      const input = target as HTMLInputElement;
      this.search = input.value;
    },
    filterRecordsIsSearchIsPagination(rows: any, idx: number) {
      const pagination = () =>
        this.isSelectPage.inicioPage - 1 <= idx &&
        this.isSelectPage.endPage > idx;

      const search = () => {
        const result = Object.values(rows).filter((item) =>
          String(item).toLowerCase().includes(String(this.search).toLowerCase())
        );
        return result.length > 0;
      };

      return this.search.length > 0 ? search() : pagination();
    },
    eventIsCheck(value: { isChecked: boolean; id: string }) {
      this.isAtualRadio = value;
    },
    navigateBack() {
      this.isSelectPage.inicioPage =
        this.isSelectPage.inicioPage - this.isSelectPage.totalPage;

      this.isSelectPage.endPage =
        this.isSelectPage.endPage - this.isSelectPage.totalPage;
    },
    navigateNext() {
      if (
        this.isSelectPage.endPage + this.isSelectPage.totalPage >
        this.rows.length
      ) {
        return;
      }

      this.isSelectPage.inicioPage =
        this.isSelectPage.inicioPage + this.isSelectPage.totalPage;

      this.isSelectPage.endPage =
        this.isSelectPage.endPage + this.isSelectPage.totalPage;
    },
    eventSelectOptionItemPage(value: any) {
      this.option.forEach((op: any) => {
        if (op.name === value.name) {
          op.active = true;
          this.isSelectPage.totalPage = value.value;
          this.isSelectPage.inicioPage = 1;
          this.isSelectPage.endPage = value.value;
        } else {
          op.active = false;
        }
      });
    },
    eventSelectLimit: function (option: any) {
      this.limitRows = option.name;

      this.limitRowsOption.map((i: any) => {
        i.active = i.value == option.value;
      });

      this.limitHeight = option.value * 34 + 40 + "px";
      this.isSelectPage.totalPage = option.value;
      this.isSelectPage.inicioPage = 1;
      this.isSelectPage.endPage = option.value;
    },
    eventSelectTable: function (idx: number, id: string) {
      const input = document.getElementById(id);
      (input as any).click();

      this.isAtualRadio = { id, isChecked: true };
    },
  },
  mounted() {
    this.columns = this.dataColumns;
    if (this.dataRows) {
      this.rows = this.dataRows;
      this.idTable = uuidv4();
    }
  },
  watch: {
    dataRows() {
      this.rows = this.dataRows;
      this.isAtualRadio = { id: "", isChecked: false };
    },
  },
})
export default class Table extends Vue {}
</script>

<style scoped lang="scss">
.table-container {
  display: flex;
  flex-direction: column;
  width: 1fr;
  height: auto;
  border: 1px solid;
  border-radius: 8px;
  border-color: var(--th-border);
  background-color: var(--th-background);
  margin: 10px 20px 60px 20px;
  position: relative;

  .title-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 0px 20px 14px 20px;
    border-bottom: 1px solid;
    border-color: #dadce0;
  }

  .title-container span {
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.45rem;
    margin-right: auto;
    margin-bottom: -1px;
    padding: 16px 0px 8px;
    -webkit-hyphens: auto;
    word-break: break-word;
    word-wrap: break-word;
    color: #1a8d5f;
    border-bottom: 2px solid;
    border-color: #1a8d5f;
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
  min-height: 424px;
  margin: 14px 20px 20px 20px;
  overflow: auto hidden;

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

.table-navigate {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px 20px 20px;

  .selectOptionRegister {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .fullPageRow {
    display: flex;
    align-items: center;
    padding: 4px 8px 4px 4px;
    letter-spacing: 0.015em;
    font-size: 0.92rem;
    line-height: 1.25rem;
    word-break: break-all;
    word-wrap: break-word;
    color: var(--th-text-df);
  }

  .navigate-control {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    .icon-container {
      width: 36px;
      height: 36px;
      padding: 0 4px;
      background-color: rgb(26, 141, 95, 0.1);
      border: 1px solid;
      border-color: transparent;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;

      i {
        background-color: #1a8d5f;
      }

      &:hover {
        border: 1px solid;
        cursor: pointer;
        border-color: rgb(1, 176, 117);
        box-shadow: 0px 0px 5px rgb(26, 141, 95, 0.4);
        transition: all 0.2s ease;
      }

      &:active {
        transform: translateY(4px);
        box-shadow: 0px 0px 2px rgba(26, 141, 95, 0.8);
        transition: all 0.2s ease;
      }
    }

    .icon-container[disabled="true"] {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}

.icon-container {
  display: flex;
  width: 18px;
  height: 18px;

  i {
    height: 100%;
    width: 100%;
    background-color: #6d6d6d;
  }
}

.msg-erro {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
}
</style>
