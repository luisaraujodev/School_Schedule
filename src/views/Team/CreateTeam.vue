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
    <Modal
      v-if="modalConfig.open"
      title="Nova Turma"
      description="Gerencie as vagas dos candidatos e preencha as seguintes informações"
      :clickbtnSubmit="clickSubmitModalCreate"
      :eventOpenModal="
        () => {
          this.modalConfig.open = false;
        }
      "
    >
      <div class="inputs-box">
        <div class="inputs-container">
          <Label name="Nome da Turma:" style="margin-right: auto" />
          <Input
            name="nameTeam"
            placeholder="Informe o nome da Turma"
            style="min-width: 270px"
            :value="modalValueTeam"
            :keyup="updateInputValueTeam"
            :required="true"
          />
        </div>
        <div class="inputs-container">
          <Label name="Selecione a Ensino/Curso:" style="margin-right: auto" />
          <Select
            name="nameTeaching"
            placeholder="Informe o nome do Ensino/Curso"
            style="min-width: 270px"
            :option="modalOptionTeaching"
            :readonly="true"
            :required="true"
            :eventSelect="eventSelectTeaching"
          />
        </div>
        <div class="inputs-container">
          <Label name="Selecione a Série:" style="margin-right: auto" />
          <Select
            name="nameSerie"
            placeholder="Informe o nome do Série"
            style="min-width: 270px"
            :option="modalOptionSerie"
            :readonly="true"
            :disabled="true"
            :required="true"
            :eventSelect="eventSelectSerie"
          />
        </div>
        <div class="inputs-container">
          <Label name="Turno:" style="margin-right: auto" />
          <Select
            name="nameShift"
            placeholder="Selecione o turno"
            style="min-width: 270px"
            :option="modalOptionShift"
            :readonly="true"
            :required="true"
            :eventSelect="eventSelectShift"
          />
        </div>
        <div class="inputs-container" style="overflow: auto">
          <TableSimple
            v-if="dataCacher.shift.shiftDetail"
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
              <tr
                v-for="shiftDetail in dataCacher.shift.shiftDetail"
                :key="shiftDetail.id"
              >
                <td>{{ shiftDetail.gridTime.name }}</td>
                <td
                  v-for="colum in filterDataListShift(shiftDetail)"
                  :key="colum"
                >
                  <CheckBox
                    :id="shiftDetail.id + colum[0]"
                    :name="colum[0]"
                    :event="
                      () => {
                        this.eventAddCheckedGridTable('select');
                      }
                    "
                    :complement="shiftDetail.gridTime.id"
                    v-if="colum[1]"
                    style="justify-content: center"
                  />
                  <div v-else style="justify-content: center">-</div>
                </td>
              </tr>
            </tbody>
          </TableSimple>
        </div>
      </div>
      <div class="buttonsModal-container">
        <Button
          type="submit"
          :clickbtn="
            () => {
              this.modalConfig.open = false;
            }
          "
        >
          Cancelar
        </Button>
        <Button name="shiftNew" theme="green" type="submit">
          Novo Turno
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable*/
import { Options, Vue } from "vue-class-component";

import Popup from "@/components/Popup.vue";
import Modal from "@/components/Modal.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Select, { tOption } from "@/components/Select.vue";
import Label from "@/components/LabelInput.vue";
import CheckBox, { checkBox_type } from "@/components/CheckBox.vue";
import TableSimple from "@/components/TableSimple.vue";

import {
  CreateTeamController,
  createTeamType,
} from "@/database/controllers/CreateTeamController";
import {
  GetAllShiftController,
  getAllShiftType,
} from "@/database/controllers/GetAllShiftController";
import { GetAllTeachingController } from "@/database/controllers/GetAllTeachingController";
import { GetAllSubjectsController } from "@/database/controllers/GetAllSubjectsController";
import { GetTeachingIDSeriesController } from "@/database/controllers/GetTeachingIDSeriesController";
import { HTMLAttributes } from "@vue/runtime-dom";

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

type TIMEANDWEEKS = {
  gridTimeId: string;
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  sun?: boolean;
};

type VALUEID = {
  id: string;
};

interface HTMLInputElementExtra extends HTMLInputElement {
  ariaRequired: HTMLAttributes;
}

interface FORMIMPUTSSUBMIT extends HTMLInputElement {
  nameTeam: HTMLInputElementExtra;
  nameTeaching: HTMLInputElementExtra;
  nameSerie: HTMLInputElementExtra;
  nameShift: HTMLInputElementExtra;
}

@Options({
  components: {
    Popup,
    Modal,
    Label,
    Input,
    Select,
    Button,
    CheckBox,
    TableSimple,
  },
  props: {
    clickClose: { type: Function },
  },
  data() {
    return {
      popupConfig: {
        open: false,
        title: "",
        description: "",
        textButton: "OK",
        isErro: false,
        isInfo: false,
        isSuccess: false,
        isDefault: false,
        event: () => {},
      },
      modalConfig: {
        open: false,
      },
      modalValueTeam: "",
      modalOptionTeaching: [],
      modalOptionSerie: [],
      modalOptionShift: [],
      dataGridTableColumns: [
        { id: "mon", name: "Segunda-feira", position: "0" },
        { id: "tue", name: "Terça-feira", position: "1" },
        { id: "wed", name: "Quarta-feira", position: "2" },
        { id: "thu", name: "Quinta-feira", position: "3" },
        { id: "fri", name: "Sexta-feira", position: "4" },
        { id: "sat", name: "Sábado", position: "5" },
        { id: "sun", name: "Domingo", position: "6" },
      ],
      dataGridTableRows: [],
      dataCacher: { shift: [] },
    };
  },
  mounted() {
    this.loadOptions();
  },
  methods: {
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

          (this.modalOptionShift as tOption[]) = result.flatMap((i) => ({
            value: i.id,
            name: i.name,
          }));

          this.dataCacher.shift = result;
          resolve("sucess");
          console.log("modalOptionShift", this.modalOptionShift);
        });
      });

      const loandAllTeaching = new Promise((resolve, reject) => {
        const getAllTeaching = new GetAllTeachingController();
        getAllTeaching.handle().then((result) => {
          if (result instanceof Error) {
            reject(new Error(result.message));
            return;
          }

          (this.modalOptionTeaching as tOption[]) = result.flatMap((i) => ({
            value: i.id,
            name: i.name,
          }));

          resolve("sucess");
        });
      });

      const loandAllSubjects = new Promise((resolve, reject) => {
        const getAllSubjects = new GetAllSubjectsController();
        getAllSubjects
          .handle()
          .then((result) => {
            if (result instanceof Error) {
              reject(new Error(result.message));
              return;
            }

            this.dataGridSubjects = result.flatMap((i) => {
              const flatMapResult = {
                id: i.id,
                name: i.name,
              };
              return flatMapResult;
            });

            resolve("sucess");
          })
          .catch((ew) => {
            console.log(ew);
          });
      });

      Promise.all([loandAllShift, loandAllTeaching, loandAllSubjects])
        .then((result) => {
          const isTotalSucess = result.filter((i) => i == "sucess");
          if (isTotalSucess.length == 3) {
            setTimeout(() => {
              this.closePopup();
              this.modalConfig.open = true;
            }, 500);
          }
        })
        .catch((error) => {
          this.closePopup();
          this.popupConfig.open = true;
          this.popupConfig.title = "Erro";
          this.popupConfig.description = error.message;
          this.popupConfig.isErro = true;
          this.popupConfig.event = this.closePopup;
        });
    },
    closePopup: function closePopup() {
      this.popupConfig = {
        open: false,
        title: "",
        description: "",
        textButton: "OK",
        isErro: false,
        isInfo: false,
        isSuccess: false,
        isDefault: false,
      };
    },
    filterDataListShift(value: getAllShiftType) {
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
    updateInputValueTeam(event: Event) {
      let getValue = "";
      if (event.srcElement) {
        getValue = (event.srcElement as any).value;
      }
      this.modalValueTeam = getValue;
    },
    eventAddCheckedGridTable(
      typeCheckBox: string,
      checkBoxSelect: checkBox_type
    ) {
      const selectAll = () => {
        const tableSimpleModalShift = document.getElementById(
          "tableSimpleModalShift"
        );

        if (!tableSimpleModalShift) {
          return;
        }

        let checkBoxAll: NodeListOf<HTMLInputElement> =
          tableSimpleModalShift.querySelectorAll('input[type="checkbox"]');

        checkBoxAll.forEach((checbox) => {
          if (checbox.id !== "tableSimpleModalShiftSelectAll") {
            checbox.click();
          }
        });
      };

      switch (typeCheckBox) {
        case "selectAll":
          selectAll();
          break;
      }
    },
    eventSelectShift(selectShift: tOption) {
      console.log(selectShift);
      const isExist: getAllShiftType[] = this.dataCacher.shift.filter(
        (i: VALUEID) => i.id === selectShift.value
      ) as getAllShiftType[];

      console.log("isExist", isExist);

      if (isExist.length > 0) {
        const listShiftSelect = isExist[0];
        this.modalOptionShift = (this.modalOptionShift as tOption[]).flatMap(
          (i: tOption) => {
            i.selected = selectShift.value == i.value;
            return i;
          }
        );

        (this.dataCacher.shift as getAllShiftType).shiftDetail =
          listShiftSelect.shiftDetail.sort((columnA, columnB) => {
            if (columnA.gridTime.position > columnB.gridTime.position) {
              return 1;
            }
            if (columnA.gridTime.position < columnB.gridTime.position) {
              return -1;
            }
            return 0;
          });
        return;
      }

      this.dataCacher.shift = [];
    },
    eventSelectTeaching(selectTeaching: tOption) {
      const nameSerie = document.querySelector("[name='nameSerie']");
      const getTeachingID = new GetTeachingIDSeriesController();

      nameSerie?.setAttribute("disabled", "true");

      getTeachingID
        .handle({ teachingID: selectTeaching.value })
        .then((result) => {
          if (result instanceof Error) {
            return;
          }

          nameSerie?.removeAttribute("disabled");

          (this.modalOptionSerie as tOption[]) = result.flatMap((i) => ({
            value: i.id,
            name: i.name,
          }));
        });

      this.modalOptionTeaching = (
        this.modalOptionTeaching as tOption[]
      ).flatMap((i: tOption) => {
        i.selected = selectTeaching.value == i.value;
        return i;
      });
    },
    eventSelectSerie(selectSerie: tOption) {
      this.modalOptionSerie = (this.modalOptionSerie as tOption[]).flatMap(
        (i: tOption) => {
          i.selected = selectSerie.value == i.value;
          return i;
        }
      );
    },
    clickSubmitModalCreate(event: SubmitEvent) {
      const checkRequired = (input: HTMLInputElementExtra) => {
        if (!input) {
          return;
        }

        if (input.ariaRequired && input.value.length === 0) {
          input.focus();
          this.closePopup();
          this.popupConfig.open = true;
          this.popupConfig.title = "Erro";
          this.popupConfig.description = "Campos Obrigatório!";
          this.popupConfig.isErro = true;
          this.popupConfig.event = () => {
            this.closePopup();
            input.focus();
          };
          return true;
        }

        return false;
      };

      event.preventDefault();
      if (!event.srcElement) {
        return;
      }

      const { nameTeam, nameTeaching, nameSerie, nameShift }: FORMIMPUTSSUBMIT =
        event.srcElement as FORMIMPUTSSUBMIT;

      if (checkRequired(nameTeam)) {
        return;
      }

      if (checkRequired(nameTeaching)) {
        return;
      }

      if (checkRequired(nameSerie)) {
        return;
      }

      if (checkRequired(nameShift)) {
        return;
      }

      const optionTeaching = (this.modalOptionTeaching as tOption[]).filter(
        (i) => i.selected === true
      );

      const optionSerie = (this.modalOptionSerie as tOption[]).filter(
        (i) => i.selected === true
      );

      const optionShift = (this.modalOptionShift as tOption[]).filter(
        (i) => i.selected === true
      );

      let listWeeksSelects: TIMEANDWEEKS[] = [];

      let checkBoxAll: NodeListOf<HTMLInputElement> = (
        event.srcElement as HTMLInputElement
      ).querySelectorAll('#tableSimpleModalShift input[type="checkbox"]');

      checkBoxAll.forEach((checbox) => {
        if (
          checbox.id !== "tableSimpleModalShiftSelectAll" &&
          checbox.checked
        ) {
          const checboxGridTimeId = (checbox.attributes as any)["complement"]
            .textContent;
          const existListWeeksSelects = listWeeksSelects.filter(
            (i) => i.gridTimeId === checboxGridTimeId
          );

          if (existListWeeksSelects.length == 0) {
            listWeeksSelects.push({
              gridTimeId: checboxGridTimeId,
            });
          }

          listWeeksSelects = listWeeksSelects.map((getWeeks) => {
            if (getWeeks.gridTimeId === checboxGridTimeId) {
              (getWeeks as any)[checbox.name] = checbox.checked;
            }

            return getWeeks;
          });
        }
      });

      if (listWeeksSelects.length == 0) {
        console.log(listWeeksSelects);
        this.closePopup();
        this.popupConfig.open = true;
        this.popupConfig.title = "Erro";
        this.popupConfig.description =
          "É necessário informar um dia e uma aula";
        this.popupConfig.isErro = true;
        this.popupConfig.event = this.closePopup;
        return;
      }

      const createTeam = new CreateTeamController();
      createTeam
        .handle({
          name: this.modalValueTeam,
          shiftId: optionShift[0].value,
          seriesId: optionSerie[0].value,
          gridTimesAndWeeks: listWeeksSelects,
        })
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  watch: {
    "popupConfig.open": function (onypopup, newpopup) {
      if (newpopup) {
        console.log("newOpen");
        if (this.popupConfig == false) {
          this.popupConfig = {
            open: false,
            title: "",
            description: "",
            textButton: "OK",
            isErro: false,
            isInfo: false,
            isSuccess: false,
            isDefault: false,
          };
        }
      }
    },
    "modalConfig.open": function (onymodal, newmodal) {
      console.log(onymodal, newmodal);
      if (newmodal) {
        this.clickClose();
      }
    },
  },
})
export default class PageModal extends Vue {}
</script>


<style lang="scss" scoped >
.inputs-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

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
