<template>
  <div class="page-container">
    <Popup
      v-if="popupConfig.open"
      :title="popupConfig.title"
      :description="popupConfig.description"
      :textButton="popupConfig.textButton"
      :isErro="popupConfig.isErro"
      :isInfo="popupConfig.isInfo"
      :isSuccess="popupConfig.isSuccess"
      :isDefault="popupConfig.isDefault"
      :eventOpenAction="popupConfig.event"
      :eventOpenPopup="
        () => {
          this.popupConfig.open = false;
        }
      "
    />
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
            <tbody v-if="dataGridShift">
              <tr
                v-for="gridShiftRows in dataGridShift"
                :key="gridShiftRows.id"
              >
                <td>
                  {{ gridShiftRows.gridTime.name }}
                </td>
                <td
                  v-for="colum in filterDataListShift(gridShiftRows)"
                  :key="colum"
                >
                  <div
                    name="dropTable"
                    :time="gridShiftRows.gridTime.name"
                    :week="colum[0]"
                    v-if="colum[1]"
                    @drop="drop"
                    @dragover="allowDrop"
                    :dropItem="colum[1]"
                  ></div>
                  <div v-else style="justify-content: center">-</div>
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
        <div
          class="items"
          @drop="drop"
          @dragover="allowDrop"
          name="dropAction"
          dropitem="true"
        >
          <div class="info">
            <label>Disponivel</label>
          </div>
          <a
            class="panel-item"
            draggable="true"
            @dragstart="drag"
            v-for="dataTeacher in dataTeachers"
            :key="dataTeacher.id"
            :id="dataTeacher.id"
          >
            <div>
              <label>{{ dataTeacher.name }}</label>
              <div class="icon" icon="item.icon">
                <i></i>
              </div>
              <span>
                {{
                  dataTeacher.workload.available +
                  "/" +
                  dataTeacher.workload.unavailable
                }}</span
              >
            </div>
            <small>{{ dataTeacher.discipline }}</small>
          </a>
          <a class="panel-item" draggable="true" @dragstart="drag" id="drag1">
            <div>
              <label>1Luis Araujo Santos Silva</label>
              <div class="icon" icon="item.icon">
                <i></i>
              </div>
              <span> 44/12</span>
            </div>
            <small>Biologia</small>
          </a>
          <a class="panel-item" draggable="true" @dragstart="drag" id="drag2">
            <div>
              <label>2Luis Araujo Santos Silva</label>
              <div class="icon" icon="item.icon">
                <i></i>
              </div>
              <span> 44/12</span>
            </div>
            <small>Biologia</small>
          </a>
          <a class="panel-item" draggable="true" @dragstart="drag" id="drag3">
            <div>
              <label>3Luis Araujo Santos Silva</label>
              <div class="icon" icon="item.icon">
                <i></i>
              </div>
              <span> 44/12</span>
            </div>
            <small>Biologia</small>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/*eslint-disable */
import { Options, Vue } from "vue-class-component";

// components
import TitlePage from "@/components/TitlePage.vue";
import Button from "@/components/Button.vue";
import { GetAllScheduleController } from "@/database/controllers/GetAllScheduleController";
import { GetAllTeamController } from "@/database/controllers/GetAllTeamController";
import { GetIDLinkClassTeacherController } from "@/database/controllers/GetIDLinkClassTeacherController";
import { GetAllShiftController } from "@/database/controllers/GetAllShiftController";
import { ShiftDetail } from "@/database/entities/ShiftDetailEntity";
import Popup from "@/components/Popup.vue";
import Modal from "@/components/Modal.vue";
import Input from "@/components/Input.vue";
import Select, { tOption } from "@/components/Select.vue";
import Label from "@/components/LabelInput.vue";
import CheckBox, { checkBox_type } from "@/components/CheckBox.vue";
import TableSimple from "@/components/TableSimple.vue";
import { Team } from "@/database/entities/TeamEntity";

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

@Options({
  components: {
    TitlePage,
    Button,
    Popup,
    Input,
    Select,
    Label,
    CheckBox,
    TableSimple,
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
      dataRows: [],
      popupConfig: {
        open: false,
        title: "",
        description: "",
        textButton: "OK",
        isErro: false,
        isInfo: false,
        isSuccess: false,
        isDefault: false,
      },
      modalConfig: {
        open: false,
      },
      dataGridShift: [],
      dropIsOver: false,
      dataTeachers: [
        {
          id: "asdad15484",
          name: "Luis Araujo Santos Silva",
          discipline: ["Biologia", "Ciencia", "Portugues"],
          workload: { available: 2, unavailable: 0 },
          restrictionsTimesWeeks: ["07:40"],
        },
      ],
    };
  },
  mounted() {
    this.loadOptions();
  },
  methods: {
    filterDataListShift(value: ShiftDetail) {
      const filterShift = Object.entries(value).filter((i) => {
        if (
          i[0] !== "id" &&
          i[0] !== "created_at" &&
          i[0] !== "updated_at" &&
          i[0] !== "gridTime"
        ) {
          return i;
        }
        return false;
      });

      return filterShift;
    },
    loadOptions() {
      this.popupConfig.open = true;
      this.popupConfig.title = "Aviso";
      this.popupConfig.description = "Carregando...";
      this.popupConfig.isInfo = true;

      const loandAllShift = new Promise((resolve, reject) => {
        const getAllShift = new GetAllShiftController();
        getAllShift.handle().then((result) => {
          if (result instanceof Error) {
            reject(new Error(result.message));
            return;
          }
          this.dataGridShift = result[0].shiftDetail;
          /// console.log("getAllShift", this.dataGridShift);
          resolve("sucess");
        });
      });

      Promise.all([loandAllShift])
        .then((result) => {
          setTimeout(() => {
            this.popupConfig.open = false;
          }, 500);
        })
        .catch((error) => {
          this.popupConfig.open = false;
          this.popupConfig.open = true;
          this.popupConfig.title = "Erro";
          this.popupConfig.description = error.message;
          this.popupConfig.isErro = true;
          this.popupConfig.event = this.closePopup;
        });
    },
    clickbtnSubmitTable(event: SubmitEvent) {
      const eventEdit = (teamId: string) => {
        this.teamId = teamId;
        console.log(teamId);
      };

      const eventLink = (teamId: string) => {
        this.openLinker = true;
        this.teamId = teamId;
        console.log(teamId);
      };

      const submit = event;

      const selectRow = (submit?.srcElement as HTMLElement).querySelectorAll(
        "input:checked"
      );

      // eslint-disable-next-line default-case
      switch ((submit?.submitter as HTMLButtonElement).name) {
        case "teamNew":
          this.openCreate = true;
          break;
        case "teamLink":
          eventLink(selectRow[0].id);
          break;
        case "teamEdit":
          eventEdit(selectRow[0].id);
          break;
        case "teamDelete":
          break;
      }
    },
    allowDrop(ev: any) {
      ev.preventDefault();
    },
    drag(ev: any) {
      ev.dataTransfer.setData("text", ev.target.id);

      // Check Exist Teacher
      const existTeacher = this.dataTeachers.filter(
        (i: any) => i.id == ev.target.id
      );

      if (existTeacher.length == 0) {
        return;
      }
      console.log(existTeacher);
      const dropIsOver = document.querySelectorAll('[name="dropTable"]');

      dropIsOver.forEach((table) => {
        const getTime = table.getAttribute("time");
        const getWeek = table.getAttribute("week");

        if (existTeacher[0].restrictionsTimesWeeks.includes(getTime)) {
          return;
        }
        table.setAttribute("dropIsOver", "true");
      });

      // (ev.target as HTMLElement).removeAttribute.add("dropIsOver");
      //  this.dropIsOver = true;
    },
    drop(ev: any) {
      const insertItem = (id: string) => {
        this.dataTeachers.map((i: any) => {
          i.workload.unavailable = 1;
        });
      };

      ev.preventDefault();

      const dropitem = (ev.target as HTMLElement).getAttribute("dropitem");

      if (dropitem == "true") {
        var data = ev.dataTransfer.getData("text");
        const isExistElement = document.getElementById(data);
        if (!isExistElement) {
          return;
        }
        this.dropIsOver = false;
        ev.target.classList.add("drop-table");
        (ev.target as HTMLElement).appendChild(isExistElement);

        const dropIsOver = document.querySelectorAll('[name="dropTable"]');
        dropIsOver.forEach((table) => {
          table.removeAttribute("dropIsOver");
        });

        return;
        // insertItem(data.id);
        // if (!this.dataListTest["07:40"]) {
        //   this.dataListTest["07:40"] = [];
        // }

        // this.dataListTest["07:40"].push({
        //   tearther: isExistElement.id,
        //   week: "ter",
        // });
      }

      const dropAction = document.querySelector("[name='dropAction']");

      if (dropAction) {
        var data = ev.dataTransfer.getData("text");
        console.log(data);
        const isExistElement = document.getElementById(data);
        if (!isExistElement) {
          return;
        }
        this.dropIsOver = false;

        const dropIsOver = document.querySelectorAll('[name="dropTable"]');
        dropIsOver.forEach((table) => {
          table.removeAttribute("dropIsOver");
        });

        console.log((dropAction as any).getElementById(data));
        if ((dropAction as any).getElementById(data)) {
          return;
        }

        dropAction.appendChild(isExistElement);
      }
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

.panel-item:hover {
  color: var(--green);
  background-color: var(--hover-green);
  opacity: 1;

  .icon i {
    background-color: var(--green);
  }
}

.drop-table {
  a {
    align-items: center;
    width: 100%;
    padding: 4px 8px;
  }

  .icon {
    display: none;
  }

  span {
    display: none;
  }
}

.drag-over {
  border: dashed 3px red;
}

[dropIsOver="true"] {
  //border: dashed 3px var(--blue);
  outline: dashed 2px var(--blue);
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
