<template>
  <div class="page-container">
    <Modal
      :title="modalConfig.type == 'new' ? 'Novo Turno' : 'Atualizar Turno'"
      description="Gerencie as vagas dos candidatos e preencha as seguintes informações"
      v-if="modalConfig.open"
      :clickbtnSubmit="clickCreateNewShift"
      :eventOpenModal="
        () => {
          this.modalConfig.open = false;
        }
      "
    >
      <div>
        <div class="inputs-container">
          <Label name="Nome do Turno:" style="margin-right: auto" />
          <Input
            name="nameShift"
            placeholder="Informe o nome do turno"
            style="width: 180px"
            :value="modalValueShift"
            :keyup="eventkeyupModalValueShift"
          />
          <Label name="Dias da semana:" style="margin-right: auto" />
          <div class="checkbox-container">
            <CheckBox
              v-for="gridWeek in dataGridWeek2"
              :key="gridWeek.id"
              :id="gridWeek.id"
              :title="gridWeek.name"
              :label="gridWeek.name"
              :event="
                () => {
                  eventAddColumWeek(
                    gridWeek.id,
                    gridWeek.name,
                    gridWeek.position
                  );
                }
              "
              style="width: 120px"
            ></CheckBox>
          </div>
          <Label name="Quantidade de aula:" style="margin-right: auto" />
          <div class="checkbox-container">
            <CheckBox
              v-for="gridTime in dataGridTime"
              :key="gridTime.id"
              :id="gridTime.id"
              :title="gridTime.name"
              :label="gridTime.name"
              :event="
                () => {
                  eventAddRowclasse(
                    gridTime.id,
                    gridTime.name,
                    gridTime.position
                  );
                }
              "
              style="width: 120px"
            ></CheckBox>
          </div>
          <TableSimple
            v-if="dataGridTableRows && dataGridTableColumns"
            id="tableSimpleModalShift"
            name="tableSimpleModalShift"
          >
            <thead>
              <tr>
                <th>
                  <CheckBox
                    id="tableSimpleModalShiftSelectAll"
                    title="Marçar Todos/Nenhum"
                    :event="
                      () => {
                        this.eventAddCheckedGridTable('selectAll');
                      }
                    "
                  />
                </th>
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
            <tbody>
              <tr v-for="rows in dataGridTableRows" :key="rows.id">
                <td>{{ rows.name }}</td>
                <td v-for="colum in dataGridTableColumns" :key="colum">
                  <CheckBox
                    :id="rows.id + colum.id"
                    :name="colum.id"
                    :title="rows.name + ' - ' + colum.name"
                    :event="
                      () => {
                        this.eventAddCheckedGridTable('select');
                      }
                    "
                    :complement="rows.id"
                    style="justify-content: center"
                  />
                </td>
              </tr>
            </tbody>
          </TableSimple>
        </div>
        <div class="buttonsModal-container">
          <Button
            name="vacanciesUpdate"
            type="submit"
            :clickbtn="
              () => {
                this.modalConfig.open = false;
              }
            "
          >
            Cancelar
          </Button>
          <div v-if="modalConfig.type == 'update'">
            <Button name="vacanciesUpdate" theme="green" type="submit">
              Atualizar Turno
            </Button>
          </div>
          <div v-if="modalConfig.type == 'new'">
            <Button name="vacanciesUpdate" theme="green" type="submit">
              Novo Turno
            </Button>
          </div>
        </div>
      </div>
    </Modal>
    <TitlePage />
    <Table
      :id="1515"
      title="Resultado"
      :dataColumns="dataColumns"
      :dataRows="dataRows"
      :radio="true"
      :clickbtnSubmit="clickbtnSubmitTable"
    >
      <div class="buttons-container">
        <Button name="shiftNew" theme="green" type="submit"> Novo </Button>
        <Button
          name="shiftEdit"
          type="submit"
          icon="edit"
          theme="line-blue"
        ></Button>
        <Button
          name="shiftDelete"
          type="submit"
          icon="trash"
          theme="line-red"
        ></Button>
      </div>
    </Table>
  </div>
</template>

<script lang="ts">
/* eslint-disable*/
import { Options, Vue } from "vue-class-component";
import { v4 as uuidv4 } from "uuid";
// components
import TitlePage from "@/components/TitlePage.vue";
import Button from "@/components/Button.vue";
import Table from "@/components/Table.vue";
import TableSimple from "@/components/TableSimple.vue";
import Modal from "@/components/Modal.vue";
import Input from "@/components/Input.vue";
import Label from "@/components/LabelInput.vue";
import CheckBox, { checkBox_type } from "@/components/CheckBox.vue";
import Tag from "@/components/Tag.vue";

// api consult vacancies
import { GetAllGridTimeController } from "@/database/controllers/GetAllGridTimeController";

import {
  GetAllShiftController,
  getAllShiftType,
} from "@/database/controllers/GetAllShiftController";
import { GetIDShiftController } from "@/database/controllers/GetIDShiftController";
import {
  CreateShiftController,
  createShiftType,
} from "@/database/controllers/CreateShiftController";
import { type } from "process";

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

type gridTimesAndWeeks_type = {
  gridTimeId: string;
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  sun?: boolean;
};

type structureGridTimeWeek_type = {
  id: string;
  name: string;
  position: number;
};

@Options({
  components: {
    TitlePage,
    Button,
    Table,
    Modal,
    Label,
    Input,
    Tag,
    CheckBox,
    TableSimple,
  },
  data() {
    return {
      modalValueShift: "",
      modalConfig: {
        open: false,
        type: "new",
      },
      alertConfig: {
        open: false,
        title: "",
        description: "",
        icon: "",
      },
      dataGridWeek2: [
        { id: "mon", name: "Segunda-feira", position: "0" },
        { id: "tue", name: "Terça-feira", position: "1" },
        { id: "wed", name: "Quarta-feira", position: "2" },
        { id: "thu", name: "Quinta-feira", position: "3" },
        { id: "fri", name: "Sexta-feira", position: "4" },
        { id: "sat", name: "Sábado", position: "5" },
        { id: "sun", name: "Domingo", position: "6" },
      ],
      dataGridTime: [],
      dataColumns: [
        {
          name: "id",
          style: "display:none",
        },
        {
          name: "Nome",
        },
        {
          name: "Data de Criação",
        },
      ],
      dataRows: [],
      setValueNameClasse: "",
      dataGridTableColumns: [],
      dataGridTableRows: [],
      dataListGridTimesAndWeeks: [],
    };
  },
  mounted() {
    const getAllSchedule = new GetAllShiftController();
    getAllSchedule
      .handle()
      .then((result) => {
        if (result instanceof Error) {
          return;
        }

        this.dataRows = result.flatMap((i) => {
          const flatMapResult = {
            id: i.id,
            name: i.name,
            created_at: i.created_at,
          };
          return flatMapResult;
        });

        console.log("mont_Shift", result);
      })
      .catch((ew) => {
        console.log(ew);
      });

    const getAllTime = new GetAllGridTimeController();

    getAllTime
      .handle()
      .then((result) => {
        if (result instanceof Error) {
          return;
        }

        this.dataGridTime = result;

        console.log("mont_Shift", result);
      })
      .catch((ew) => {
        console.log(ew);
      });
  },
  methods: {
    eventAddRowclasse(id: string, name: string, position: number) {
      const isExistRow: [] = this.dataGridTableRows.filter(
        (i: structureGridTimeWeek_type) => i.id === id
      );

      if (isExistRow.length > 0) {
        this.dataGridTableRows = this.dataGridTableRows.filter(
          (i: structureGridTimeWeek_type) => i.id !== id
        );

        return;
      }

      (this.dataGridTableRows as structureGridTimeWeek_type[]).push({
        id,
        name,
        position,
      });

      (this.dataGridTableRows as structureGridTimeWeek_type[]).sort(
        (columnA, columnB) => {
          if (columnA.position > columnB.position) {
            return 1;
          }
          if (columnA.position < columnB.position) {
            return -1;
          }
          return 0;
        }
      );
    },
    eventAddColumWeek(id: string, name: string, position: number) {
      const isExistColum: [] = this.dataGridTableColumns.filter(
        (i: structureGridTimeWeek_type) => i.id === id
      );

      if (isExistColum.length > 0) {
        this.dataGridTableColumns = this.dataGridTableColumns.filter(
          (i: structureGridTimeWeek_type) => i.id !== id
        );

        return;
      }

      (this.dataGridTableColumns as structureGridTimeWeek_type[]).push({
        id,
        name,
        position,
      });

      (this.dataGridTableColumns as structureGridTimeWeek_type[]).sort(
        (columnA, columnB) => {
          if (columnA.position > columnB.position) {
            return 1;
          }
          if (columnA.position < columnB.position) {
            return -1;
          }
          return 0;
        }
      );

      console.log(this.dataGridTableColumns);
    },
    eventAddCheckedGridTable(
      typeCheckBox: string,
      checkBoxSelect: checkBox_type
    ) {
      console.log(checkBoxSelect);

      const selectAll = () => {
        const tableSimpleModalShift = document.getElementById(
          "tableSimpleModalShift"
        );

        if (!tableSimpleModalShift) {
          return;
        }

        const checkBoxAll: NodeListOf<HTMLInputElement> =
          tableSimpleModalShift.querySelectorAll('input[type="checkbox"]');

        checkBoxAll.forEach((checbox) => {
          if (checbox.id !== "tableSimpleModalShiftSelectAll") {
            checbox.click();
          }
        });
      };

      const select = () => {
        console.log("sadas");
      };

      switch (typeCheckBox) {
        case "selectAll":
          selectAll();
          break;
        default:
          select();
          break;
      }
      //  const getlistCheckGrid: gridStructure_type[] = this.listCheckGrid;
      //       let verifyExistChecked: gridStructure_type[] = getlistCheckGrid.filter(
      //         (i) => i.name === checkGrid.name
      //       );
      //       if (verifyExistChecked.length == 0) {
      //         const verifyExist = (this.dataRows as structureGridTimeWeek_type[]).filter(
      //           (i) => i.name === checkGrid.name
      //         )[0];
      //         getlistCheckGrid.push({
      //           gridTimeID: verifyExist.id,
      //           name: checkGrid.name,
      //         });
      //         verifyExistChecked = getlistCheckGrid.filter(
      //           (i) => i.name === checkGrid.name
      //         );
      //       }
      //       verifyExistChecked[0][checkGrid.complement] = checkGrid.isChecked;
      //       console.log(verifyExistChecked);
    },
    eventkeyupModalValueShift(event: Event) {
      let getValue = "";
      if (event.srcElement) {
        getValue = (event.srcElement as any).value;
      }
      this.modalValueShift = getValue;
    },
    eventlistCheckedWeek(listCheckGrid: gridTimesAndWeeks_type) {
      this.dataListGridTimesAndWeeks = listCheckGrid;
      console.log("listCheckGrid", listCheckGrid);
    },
    clickbtnSubmitTable(event: SubmitEvent) {
      const eventEdit = (shiftId: string) => {
        // const addgridweek = (shiftDetail) => {
        //   const setChecksWeek = document.querySelectorAll(
        //     'input[type="checkbox"]'
        //   );
        //   setChecksWeek.forEach((set) => {
        //     // eslint-disable-next-line no-unused-expressions
        //     const isExist = result.gridweek.filter((i) => i.id === set.id);
        //     if (isExist) {
        //       (set as HTMLElement).click();
        //     }
        //   });
        // };
        // const addgridTime = (shiftDetail) => {
        //   this.dataGridTableRows = shiftDetail.gridtime;
        // };
        // const getIDShift = new GetIDShiftController();
        // getIDShift
        //   .handle({ shiftId })
        //   .then((result) => {
        //     if (result instanceof Error) {
        //       return;
        //     }
        //     this.modalConfig = {
        //       open: true,
        //       type: "update",
        //     };
        //     this.modalValueShift = result.name;
        //     // verify exist shiftDetail and add weeks and time
        //     if (result.shiftDetail) {
        //       setTimeout(() => {
        //         addgridweek(result.shiftDetail);
        //         addgridTime(result.shiftDetail);
        //       }, 500);
        //     }
        //     console.log("getIDShift_edit", result);
        //   })
        //   .catch((ew) => {
        //     console.log(ew);
        //   });
      };

      const eventNew = () => {
        this.modalConfig = {
          open: true,
          type: "new",
        };
        this.modalValueShift = "";
        this.dataGridTableRows = [];
        this.dataGridTableColumns = [];
      };

      const submit = event;

      const selectRow = (submit?.srcElement as HTMLElement).querySelectorAll(
        "input:checked"
      );

      // verify select row
      // if (selectRow.length == 0) {
      //   this.alertConfig = {
      //     open: true,
      //     title: "Aviso",
      //     description: "Nenhum registro foi selecionado",
      //     icon: "info",
      //   };
      //   return;
      // }

      // eslint-disable-next-line default-case
      switch ((submit?.submitter as HTMLButtonElement).name) {
        case "shiftNew":
          eventNew();
          break;
        case "shiftEdit":
          eventEdit(selectRow[0].id);
          break;
        case "shiftDelete":
          break;
      }
    },
    clickCreateNewShift(event: SubmitEvent) {
      event.preventDefault();
      // console.log(this.dataListGridTimesAndWeeks);
      const getAllGridTimeWeeks = () => {
        let listTimeWeeksSelects: gridTimesAndWeeks_type[] = [];
        const tableSimpleModalShift = document.getElementById(
          "tableSimpleModalShift"
        );

        if (!tableSimpleModalShift) {
          return;
        }

        const checkBoxAll: NodeListOf<HTMLInputElement> =
          tableSimpleModalShift.querySelectorAll('input[type="checkbox"]');

        checkBoxAll.forEach((checbox) => {
          if (
            checbox.id !== "tableSimpleModalShiftSelectAll" &&
            checbox.checked
          ) {
            const checboxGridTimeId = (checbox.attributes as any)["complement"]
              .textContent;
            const existListWeeksSelects = listTimeWeeksSelects.filter(
              (i) => i.gridTimeId === checboxGridTimeId
            );

            if (existListWeeksSelects.length == 0) {
              listTimeWeeksSelects.push({
                gridTimeId: checboxGridTimeId,
              });
            }

            listTimeWeeksSelects = listTimeWeeksSelects.map((getWeeks) => {
              if (getWeeks.gridTimeId === checboxGridTimeId) {
                (getWeeks as any)[checbox.name] = checbox.checked;
              }

              return getWeeks;
            });
          }
        });

        return listTimeWeeksSelects;
      };

      const createShift = new CreateShiftController();

      const setcreateShift: createShiftType = {} as createShiftType;

      setcreateShift.name = this.modalValueShift;

      const listTime = getAllGridTimeWeeks();
      console.log(listTime);
      if (!listTime) {
        return;
      }

      setcreateShift.gridTimesAndWeeks = listTime;

      console.log(setcreateShift);

      createShift
        .handle(setcreateShift)
        .then((e) => {
          console.log("setcreateShift", e);
        })
        .catch((e) => {
          console.log("errocreateShift", e);
        });
    },
  },
})
export default class PageContainer extends Vue {}
</script>

<style scoped lang="scss">
.inputs-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: row;
    margin: 4px 0;
  }

  .checkbox-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
}

.buttons-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.buttonsModal-container {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border-top: 1px solid;
  border-color: #dadce0;
  padding-top: 16px;

  > div:first-child {
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>
