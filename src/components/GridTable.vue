<template>
  <form
    class="table-container"
    action=""
    @submit="checkForm"
    method="post"
    :id="id"
  >
    <div class="table-content">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="colum in dataColumns" :key="colum.name">
              {{ colum.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in rows" :key="row.id" :id="row.id">
            <td>
              {{ row.name }}
            </td>
            <td v-for="colum in dataColumns" :key="colum.name">
              <CheckBox
                :value="colum.id + idx"
                :event="
                  () => {
                    this.eventAddChecked(idx, row, colum);
                  }
                "
                style="justify-content: center"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>

<script lang="ts">
/* eslint-disable*/
import { Options, Vue } from "vue-class-component";
import { v4 as uuidv4 } from "uuid";
import CheckBox from "@/components/CheckBox.vue";

export type columnStructure_type = {
  id: string;
  name: string;
  position: number;
};

export type rowStructure_type = {
  id: string;
  name: string;
  position: number;
};

export type gridStructure_type = {
  idRow: rowStructure_type;
  idsColumns: columnStructure_type[];
};

@Options({
  components: { CheckBox },
  props: {
    id: String,
    dataColumns: {
      type: Array,
      default: [],
    },
    dataRows: {
      type: Array,
      default: [],
    },
    eventlistChecked: { type: Function },
     clickbtnSubmit: { type: Function },
  },
  data() {
    return {
      idTable: "",
      search: "",
      rows: [],
      columns: [],
      listCheckGrid: [],
    };
  },
  methods: {
    checkForm(event: any) {
      event?.preventDefault();
      this.clickbtnSubmit(event);
    },
    eventAddChecked(
      idx: number,
      row: rowStructure_type,
      colum: columnStructure_type
    ) {
      const verifyExistCheckColumns = (columns: columnStructure_type[]) => {
        return columns.filter((i) => i.id === colum.id);
      };

      if (!this.listCheckGrid[idx]) {
        (this.listCheckGrid[idx] as gridStructure_type) = {
          idRow: row,
          idsColumns: [],
        };
      }

      if (
        verifyExistCheckColumns(this.listCheckGrid[idx].idsColumns).length > 0
      ) {
        this.listCheckGrid[idx].idsColumns = (
          this.listCheckGrid[idx].idsColumns as columnStructure_type[]
        ).filter((i) => i.id !== colum.id);

        // set event
        this.eventlistChecked(this.listCheckGrid);
        return;
      }

      (this.listCheckGrid[idx] as gridStructure_type).idRow = row;
      (this.listCheckGrid[idx] as gridStructure_type).idsColumns.push(colum);

      // set event
      this.eventlistChecked(this.listCheckGrid);
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

      // update listCheck
      (this.listCheckGrid as gridStructure_type[]).filter((listgrid) => {
        const isExistRow = (this.rows as rowStructure_type[]).filter(
          (i) => i.id == listgrid.idRow.id
        );
        return isExistRow;
      });

      this.eventlistChecked(this.listCheckGrid);
    },
    dataColumns() {
      this.columns = this.dataColumns;

      (this.listCheckGrid as gridStructure_type[]).map((listgrid) => {
        listgrid.idsColumns = listgrid.idsColumns.filter((listgridColum) => {
          const exist = (this.columns as columnStructure_type[]).includes(
            listgridColum
          );
          return exist;
        });
      });

      this.eventlistChecked(this.listCheckGrid);
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
  margin: 4px 0;
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
  margin: 4px 0;
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
</style>
