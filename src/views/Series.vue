<template>
  <div class="page-container">
    <Modal
      :title="
        modalConfig.type == 'new'
          ? 'Nova Série/Modulo'
          : 'Atualizar Série/Modulo'
      "
      description="Gerencie as vagas dos candidatos e preencha as seguintes informações"
      v-if="modalConfig.open"
      :clickbtnSubmit="clickSubmitModalCreateUpdateShift"
      :eventOpenModal="
        () => {
          this.modalConfig.open = false;
        }
      "
    >
      <div class="inputs-container">
        <Label name="Nome da Série/Modulo:" style="margin-right: auto" />
        <Input
          name="nameSeries"
          placeholder="Informe o nome da Série/Modulo"
          style="width: 280px"
          :value="modalValueSeries"
          :keyup="eventkeyupmodalValueSeries"
        />
        <Label name="Selecione a Ensino/Curso:" style="margin-right: auto" />
        <Select
          name="nameTeaching"
          placeholder="Informe o nome do Ensino/Curso"
          style="width: 280px"
          :option="modalOptionTeaching"
          :readonly="true"
          :eventSelect="eventSelectTeaching"
        />
        <Label name="Disciplinas:" style="margin-right: auto" />
        <div id="tableModalDisciplinas">
          <div v-for="gridSubject in dataGridSubjects" :key="gridSubject.name">
            <Label
              :name="gridSubject.name"
              :bold="false"
              style="margin-right: 4px; width: 240px"
              width="140px"
            />
            <Input
              name="listDisciplinesAndWorkload"
              type="number"
              style="width: 80px"
              :id="gridSubject.id"
            />
          </div>
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
// components
import TitlePage from "@/components/TitlePage.vue";
import Button from "@/components/Button.vue";
import Table from "@/components/Table.vue";
import Modal from "@/components/Modal.vue";
import Input from "@/components/Input.vue";
import Select, { tOption } from "@/components/Select.vue";
import Label from "@/components/LabelInput.vue";
import CheckBox, { checkBox_type } from "@/components/CheckBox.vue";
import TableSimple from "@/components/TableSimple.vue";

// consult api
import {
  createSeriesType,
  CreateSeriesController,
} from "@/database/controllers/CreateSeriesController";
import { GetAllSeriesController } from "@/database/controllers/GetAllSeriesController";
import {
  GetAllShiftController,
  getAllShiftType,
} from "@/database/controllers/GetAllShiftController";

import { GetAllTeachingController } from "@/database/controllers/GetAllTeachingController";
import { GetAllSubjectsController } from "@/database/controllers/GetAllSubjectsController";

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

type dataListCheckedShiftSubjects_type = {
  id: string;
};

type dataListChecked = {
  shift: dataListCheckedShiftSubjects_type[];
  subjects: dataListCheckedShiftSubjects_type[];
};

type submitInputs = {
  nameSeries?: HTMLInputElement;
  nameTeaching?: HTMLInputElement;
  nameShift?: HTMLInputElement;
};

type weeks_type = {
  gridTimeId: string;
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  sun?: boolean;
};

type subjectIdstype = {
  id: string;
};

type DISCIPLINESANDWORKLOAD = {
  disciplineId: string;
  workload: number;
};

@Options({
  components: {
    TitlePage,
    Button,
    Table,
    Modal,
    Label,
    Input,
    Select,
    CheckBox,
    TableSimple,
  },
  data() {
    return {
      modalValueSeries: "",
      modalOptionTeaching: [],
      modalConfig: {
        open: false,
        type: "new",
      },
      modalLinkConfig: { open: false, type: "new" },
      alertConfig: {
        open: false,
        title: "",
        description: "",
        icon: "",
      },
      dataGridSubjects: [],
      dataListCheckSubjects: [],
      dataColumns: [
        {
          name: "id",
          style: "display:none",
        },
        {
          name: "Nome",
        },
        {
          name: "Total de Turmas",
        },
        {
          name: "Total de Disciplinas",
        },
        {
          name: "Data de Criação",
        },
      ],
      dataRows: [],
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
    };
  },
  mounted() {
    const getAllSeries = new GetAllSeriesController();
    getAllSeries
      .handle()
      .then((result) => {
        console.log(result);
        if (result instanceof Error) {
          return;
        }

        console.log(this.dataRows);
        this.dataRows = result.flatMap((i) => {
          const flatMapResult = {
            id: i.id,
            name: i.name,
            teaching: i.teaching,
            disciplineWorkload: i.disciplineWorkload,
          };
          return flatMapResult;
        });

        console.log("GetAllSubjects", result);
      })
      .catch((ew) => {
        console.log(ew);
      });

    const getAllTeaching = new GetAllTeachingController();
    getAllTeaching
      .handle()
      .then((result) => {
        if (result instanceof Error) {
          return;
        }
        (this.modalOptionTeaching as tOption[]) = result.flatMap((i) => ({
          value: i.id,
          name: i.name,
        }));

        console.log("getAllTeaching", result);
      })
      .catch((ew) => {
        console.log(ew);
      });

    const GetAllSubjects = new GetAllSubjectsController();
    GetAllSubjects.handle()
      .then((result) => {
        console.log(result);
        if (result instanceof Error) {
          return;
        }

        this.dataGridSubjects = result.flatMap((i) => {
          const flatMapResult = {
            id: i.id,
            name: i.name,
          };
          return flatMapResult;
        });

        console.log("GetAllSubjects", result);
      })
      .catch((ew) => {
        console.log(ew);
      });
  },
  methods: {
    eventkeyupmodalValueSeries(event: Event) {
      let getValue = "";
      if (event.srcElement) {
        getValue = (event.srcElement as any).value;
      }
      this.modalValueSeries = getValue;
    },
    eventSelectTeaching(selectTeaching: tOption) {
      this.modalOptionTeaching = (
        this.modalOptionTeaching as tOption[]
      ).flatMap((i: tOption) => {
        i.selected = selectTeaching.value == i.value;
        return i;
      });
    },
    clickbtnSubmitTable(event: SubmitEvent) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const eventEdit = (shiftId: string) => {};

      const eventNew = () => {
        this.modalConfig = {
          open: true,
          type: "new",
        };
        this.modalValueShift = "";
        this.dataGridTableRows = [];
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
    clickSubmitModalCreateUpdateShift(event: SubmitEvent) {
      event.preventDefault();
      //submitInputs
      if (!event.srcElement) {
        return;
      }

      const optionTeaching = (this.modalOptionTeaching as tOption[]).filter(
        (i) => i.selected === true
      );

      let listWeeksSelects: weeks_type[] = [];

      let selectAllDisciplinesAndWorkload: NodeListOf<HTMLInputElement> = (
        event.srcElement as HTMLInputElement
      ).querySelectorAll(
        "#tableModalDisciplinas input[name='listDisciplinesAndWorkload']"
      );

      const listDisciplinesAndWorkload: DISCIPLINESANDWORKLOAD[] = [];

      for (const select of selectAllDisciplinesAndWorkload) {
        if (Number(select.value) > 0) {
          listDisciplinesAndWorkload.push({
            disciplineId: select.id,
            workload: Number(select.value),
          });
        }
      }

      console.log(
        this.modalValueSeries,
        optionTeaching[0].value,
        listDisciplinesAndWorkload
      );

      const createSeries = new CreateSeriesController();
      createSeries
        .handle({
          name: this.modalValueSeries,
          teachingId: optionTeaching[0].value,
          disciplineWorkload: listDisciplinesAndWorkload,
        })
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
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

#tableModalDisciplinas {
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: row;
    margin: 4px 0;
  }
}
</style>
