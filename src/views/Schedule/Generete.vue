<template>
  <div class="page-container">
    <TitlePage namePage="Cronograma Escolar / Gerar Horario" />
    <div class="panel-container">
      <div class="panel-view">
        <div class="table-content">
          <table>
            <thead>
              <tr>
                <th
                  v-for="dataWeek in dataGridTableColumns"
                  :key="dataWeek.name"
                >
                  <div>
                    {{ dataWeek.name }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="dataListTimeWeekRows">
              <tr v-for="timeWeek in dataListTimeWeekRows" :key="timeWeek.time">
                <td>
                  {{ timeWeek.time }}
                </td>
                <td v-for="week in timeWeek.weeks" :key="week">
                  <div
                    name="dropTable"
                    :time="timeWeek.time"
                    :week="week"
                    @drop="drop"
                    @dragover="allowDrop"
                    :dropItem="week"
                    :dropIsOver="statusEventGrid.dropIsOver"
                  >
                    <div v-if="dataListGrid">
                      <div
                        v-for="(dataListGrid, idx) in filterData(
                          timeWeek.time,
                          week
                        )"
                        class="drop-itemTable"
                        :selectItemPanelId="
                          statusEventGrid.selectItemPanelId ==
                          dataListGrid?.tearcher.id
                        "
                        :key="idx"
                      >
                        <label>{{ dataListGrid?.tearcher.name }}</label>
                        <small>{{ dataListGrid?.discipline.name }}</small>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel-action">
        <div class="title">
          <label>Professor</label>
        </div>
        <div class="items" name="dropAction" dropitem="true">
          <div class="info">
            <label>Disponivel</label>
          </div>
          <a
            class="panel-item"
            v-for="(teacher, idx) in dataListPanelAction.teachers"
            :key="idx"
            :id="teacher.id"
            draggable="true"
            @dragstart="drag"
            @mouseout="eventMouseUpPanelItem"
            @click="eventClickPanelItem"
            name="dropAction"
            dropitem="true"
            :aria-disabled="
              !(teacher.workload.available > teacher.workload.unavailable)
            "
          >
            <div>
              <label>{{ teacher.name }}</label>
              <div class="icon" icon="item.icon">
                <i></i>
              </div>
              <span>
                {{
                  teacher.workload.available +
                  "/" +
                  teacher.workload.unavailable
                }}</span
              >
            </div>
            <div>
              <small
                v-for="discipline in teacher.discipline"
                :key="discipline"
                >{{ discipline }}</small
              >
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/*eslint-disable */
import { Options, Vue } from "vue-class-component";
import { ShiftDetail } from "@/database/entities/ShiftDetailEntity";

interface SubmitEvent extends Event {
  submitter: HTMLElement;
  dataTransfer: DataTransfer;
  target: HTMLElement;
}

interface DATALISTGRID {
  time: string;
  week: string;
  tearcher: { id: string; name: string };
  discipline: { id: string; name: string };
}

type TIMESWEEKS = {
  time: string;
  week: string;
};

type PANEL_ACTION_TEACHERS = {
  id: string;
  name: string;
  discipline: Array<string>;
  workload: { available: number; unavailable: number };
  restrictionsTimesWeeks: TIMESWEEKS[];
};

interface DATA_LIST_PANEL_ACTION {
  teachers: PANEL_ACTION_TEACHERS[];
}

// components
import TitlePage from "@/components/TitlePage.vue";
import { Console } from "console";
@Options({
  components: {
    TitlePage,
  },
  data() {
    return {
      dataGridTableColumns: [
        { id: "hor", name: "Horário", position: "-1" },
        { id: "mon", name: "Segunda-feira", position: "0" },
        { id: "tue", name: "Terça-feira", position: "1" },
        { id: "wed", name: "Quarta-feira", position: "2" },
        { id: "thu", name: "Quinta-feira", position: "3" },
        { id: "fri", name: "Sexta-feira", position: "4" },
        { id: "sat", name: "Sábado", position: "5" },
        { id: "sun", name: "Domingo", position: "6" },
      ],
      dataListTimeWeekRows: [
        {
          time: "07:40",
          weeks: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        },
        {
          time: "08:40",
          weeks: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        },
      ],
      dataListPanelAction: {
        teachers: [
          {
            id: "1",
            name: "Luis Araujo Santos Silva",
            discipline: ["Biologia", "Ciencia", "Portugues"],
            workload: { available: 2, unavailable: 0 },
            restrictionsTimesWeeks: [{ time: "07:40", week: "sat" }],
          },
          {
            id: "2",
            name: "Luis Araujo Santos Silva",
            discipline: ["Biologia", "Ciencia", "Portugues"],
            workload: { available: 2, unavailable: 0 },
            restrictionsTimesWeeks: [{ time: "07:40", week: "sat" }],
          },
          {
            id: "3",
            name: "Luis Araujo Santos Silva",
            discipline: ["Biologia", "Ciencia", "Portugues"],
            workload: { available: 2, unavailable: 0 },
            restrictionsTimesWeeks: [{ time: "07:40", week: "sat" }],
          },
        ],
      },
      dataListGrid: [],
      statusEventGrid: {
        dragOver: false,
        dropIsOver: false,
        selectItemPanelId: "",
      },
    };
  },
  mounted() {},
  methods: {
    filterData(time: string, week: string) {
      const filter = (this.dataListGrid as DATALISTGRID[]).filter((i) => {
        return i.time == time && i.week == week;
      });

      return filter;
    },
    allowDrop(event: SubmitEvent) {
      event.preventDefault();
    },
    drag(event: SubmitEvent) {
      // get id
      if (!event.target) {
        return;
      }
      event.dataTransfer.setData("text", event.target?.id);
      this.statusEventGrid.dropIsOver = true;
    },
    drop(event: SubmitEvent) {
      const contTotalAddGrid = (id: string) => {
        (this.dataListPanelAction as DATA_LIST_PANEL_ACTION).teachers.map(
          (i) => {
            if (i.id == id) {
              i.workload.unavailable = i.workload.unavailable + 1;
            }

            return i;
          }
        );
      };

      const contTotalRemoverGrid = (id: string, time: string, week: string) => {
        console.log(id, time, week);
        (this.dataListPanelAction as DATA_LIST_PANEL_ACTION).teachers.map(
          (i: any) => {
            if (i.id == id) {
              i.workload.unavailable = i.workload.unavailable - 1;
            }
            return i;
          }
        );

        this.dataListGrid = (this.dataListGrid as DATALISTGRID[]).filter(
          (data) => {
            const existTeacherFilter =
              data.tearcher.id == id && data.time == time && data.week == week;

            return !existTeacherFilter;
          }
        );
      };

      event.preventDefault();

      var itemPanelAction = event.dataTransfer.getData("text");

      const existTeacher = (
        this.dataListPanelAction as DATA_LIST_PANEL_ACTION
      ).teachers.filter((i) => i.id == itemPanelAction);

      if (existTeacher.length > 0) {
        const totalWorkload = existTeacher[0].workload;

        if (!(totalWorkload.available > totalWorkload.unavailable)) {
          alert("Não é possivel Adicionar um professor!");
          return;
        }
      }

      const getTime = event.target.getAttribute("time");
      const getWeek = event.target.getAttribute("week");

      if (!getTime) {
        return;
      }

      if (!getWeek) {
        return;
      }

      const existDataListGrid = this.dataListGrid.filter((i: any) => {
        return i.time == getTime && i.week == getWeek;
      });

      if (existDataListGrid.length > 0) {
        contTotalRemoverGrid(
          existDataListGrid[0].tearcher.id,
          getTime,
          getWeek
        );
      }

      const dataListGrid: DATALISTGRID[] = this.dataListGrid;

      dataListGrid.push({
        time: getTime,
        week: getWeek,
        tearcher: {
          id: itemPanelAction,
          name: "luis",
        },
        discipline: { id: "1", name: existTeacher[0].discipline[0] },
      });

      // add grid
      contTotalAddGrid(itemPanelAction);

      this.statusEventGrid.dropIsOver = false;
      //console.log("dataListGrid", this.dataListGrid, getTime, getWeek);
    },
    eventClickPanelItem(event: SubmitEvent) {
      event.preventDefault();

      if (!event.target) {
        return;
      }
      
      if (this.statusEventGrid.selectItemPanelId == event.target?.id ) {
        this.statusEventGrid.selectItemPanelId = ""
        return
      }

      this.statusEventGrid.selectItemPanelId = event.target?.id;
    },
    eventMouseOutPanelItem(event: SubmitEvent) {
      //event.preventDefault();
      this.statusEventGrid.dragOver = false;
      this.statusEventGrid.dropIsOver = false;
    },
  },
})
export default class PageContainer extends Vue {}
</script>

<style lang="scss" scoped >
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.panel-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
}

.panel-action {
  display: flex;
  flex-direction: column;
  width: 240px;
  min-width: 200px;
  background-color: var(--th-background);
  border: 1px solid;
  border-color: var(--th-border);
  border-radius: 4px;
  margin: 10px 20px 10px 0;
  position: relative;
  overflow: hidden;

  > .title {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 8px 16px;
    font-weight: 500;
    font-size: var(--size-medium);
    color: var(--green);
    border-bottom: 1px solid;
    border-color: var(--th-border);
  }

  > .items {
    display: flex;
    flex-direction: column;
    height: 100%;

    .info {
      display: flex;
      align-items: center;
      height: 28px;
      padding: 4px 16px;
      font-weight: 500;
      font-size: 0.785rem;
      color: var(--th-text-df);
      opacity: 0.6;
    }
  }
}

.panel-item {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0, 0);
  border-radius: 4px;
  padding: 8px 16px;
  margin: 4px 4px;
  font-size: var(--size-medium);
  color: var(--th-text-df);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  transition: color 0.1s, background-color 0.1s;
  cursor: pointer;

  > div {
    display: flex;
    pointer-events: none;

    label {
      margin-right: auto;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      pointer-events: none;
    }

    span {
      font-size: 0.8rem;
      font-weight: 400;
      pointer-events: none;
    }
  }

  small {
    font-weight: 400;
    opacity: 0.8;
    font-size: 0.785rem;
    padding-top: 2px;
    padding-right: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
}

[theme="dark"] .panel-item:hover {
  color: var(--white);
  background-color: var(--th-hover);
  opacity: 1;
}

.panel-item[aria-disabled="true"] {
  opacity: 0.5;
  // pointer-events: none;
}

.panel-item:hover {
  color: var(--green);
  background-color: var(--hover-green);
  opacity: 1;

  .icon i {
    background-color: var(--green);
  }
}

.dropTable {
  display: flex;
}

.drop-itemTable {
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0, 0);
  border-radius: 4px;
  padding: 8px 16px;
  margin: 4px 4px;
  font-size: var(--size-medium);
  color: var(--th-text-df);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  transition: color 0.1s, background-color 0.1s;
  cursor: pointer;

  label {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
  }

  small {
    font-weight: 400;
    opacity: 0.8;
    font-size: 0.785rem;
    padding-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.drag-over {
  border: dashed 3px red;
}

[dropIsOver="true"] {
  //border: dashed 3px var(--blue);
  outline: dashed 2px var(--blue);

  * {
    pointer-events: none;
  }
}

@keyframes rotate {
  0% {
    transform: rotateZ(-5deg);
  }

  50% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(5deg);
  }
}

[selectitempanelid="true"] {
  // outline: dashed 3px red;
  animation: rotate 0.2s alternate infinite linear;
}

.table-content {
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  margin: 20px;

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

    th {
      border-bottom: 1px solid;
      border-color: #dadce0;
      margin: 0;
      padding: 8px 0;
    }

    td,
    th {
      text-align: center;
    }

    th {
      font-size: 0.852rem;
      font-weight: 500;
      white-space: normal;
      text-overflow: ellipsis;
    }

    td {
      font-size: 0.84rem;
      white-space: nowrap;
      /*overflow: hidden;*/
      padding: 4px;
      text-overflow: ellipsis;

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        min-height: 52px;
        margin: 0 auto;
      }
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
