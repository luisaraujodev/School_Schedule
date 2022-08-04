<template>
  <div class="page-container">
    <Modal
      :title="
        modalConfig.type == 'new' ? 'Novo Professor' : 'Atualizar Professor'
      "
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
          <Label name="Nome da Professor(a):" style="margin-right: auto" />
          <Input
            name="nameSubjects"
            placeholder="Informe o nome da Disciplinas"
            style="width: 280px"
            :value="modalValueName"
            :keyup="eventkeyupModalValue"
          />
          <Label
            name="Carga Horária"
            style="margin-right: auto"
          />
          <Input
            name="nameWorkload"
            type="number"
            style="width: 80px"
            :value="modalValueWorkload"
            :keyup="eventkeyupModalValue"
          />
          <Label name="Turno:" style="margin-right: auto" />
          <div class="checkbox-container">
            <CheckBox
              v-for="gridShift in dataGridShift"
              :key="gridShift.name"
              :id="gridShift.id"
              :label="gridShift.name"
              :title="gridShift.name"
              :name="gridShift.name"
              :event="
                () => {
                  eventAddGridShift(gridShift.id);
                }
              "
              style="width: 120px"
            ></CheckBox>
          </div>
          <Label name="Disciplinas:" style="margin-right: auto" />
          <div class="checkbox-container">
            <CheckBox
              v-for="gridSubject in dataGridSubjects"
              :key="gridSubject.name"
              :id="gridSubject.id"
              :name="gridSubject.name"
              :label="gridSubject.name"
              :title="gridSubject.name"
              :event="
                () => {
                  eventAddGridSubject(gridSubject.id);
                }
              "
              style="width: 120px"
            ></CheckBox>
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
import { Options, Vue } from "vue-class-component";
// components
import TitlePage from "@/components/TitlePage.vue";
import Button from "@/components/Button.vue";
import Table from "@/components/Table.vue";
import Modal from "@/components/Modal.vue";
import Input from "@/components/Input.vue";
import Label from "@/components/LabelInput.vue";
import CheckBox from "@/components/CheckBox.vue";

// consult api
import {
  CreateTeachersController,
  createTeachersType,
} from "@/database/controllers/CreateTeachersController";
import { GetAllTeachersController } from "@/database/controllers/GetAllTeachersController";
import { GetAllShiftController } from "@/database/controllers/GetAllShiftController";
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

@Options({
  components: {
    TitlePage,
    Button,
    Table,
    Modal,
    Label,
    Input,
    CheckBox,
  },
  data() {
    return {
      modalValueName: "",
      modalValueWorkload: "",
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
      dataGridShift: [],
      dataGridSubjects: [],
      dataColumns: [
        {
          name: "id",
          style: "display:none",
        },
        {
          name: "Nome",
        },
        {
          name: "Total de Turnos",
        },
        {
          name: "Total de Disciplinas",
        },
        {
          name: "Data de Criação",
        },
      ],
      dataRows: [],
      dataListChecked: { shift: [], subjects: [] },
    };
  },
  mounted() {
    const getAllTeachers = new GetAllTeachersController();
    getAllTeachers
      .handle()
      .then((result) => {
        console.log(result);
        if (result instanceof Error) {
          return;
        }

        this.dataRows = result.flatMap((i) => {
          const flatMapResult = {
            id: i.id,
            name: i.name,
            shift: i.shift.length,
            subjects: i.subjects.length,
            created_at: i.created_at,
          };
          return flatMapResult;
        });

        console.log("GetAllSubjects", result);
      })
      .catch((ew) => {
        console.log(ew);
      });

    const getAllShift = new GetAllShiftController();
    getAllShift
      .handle()
      .then((result) => {
        if (result instanceof Error) {
          return;
        }

        this.dataGridShift = result.flatMap((i) => {
          const flatMapResult = {
            id: i.id,
            name: i.name,
          };
          return flatMapResult;
        });

        console.log("dataGridShift", this.dataGridShift);
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
    eventkeyupModalValue(event: Event) {
      let getValue = "";
      if (event.srcElement) {
        getValue = (event.srcElement as HTMLInputElement).value;
      }

      if ((event.srcElement as HTMLInputElement).name === "nameSubjects") {
        this.modalValueName = getValue;
      }

      if ((event.srcElement as HTMLInputElement).name === "nameWorkload") {
        this.modalValueWorkload = getValue;
      }
    },
    eventAddGridShift(id: string) {
      const isExist: [] = this.dataListChecked.shift.filter(
        (i: dataListCheckedShiftSubjects_type) => i.id === id,
      );

      if (isExist.length > 0) {
        this.dataListChecked.shift = (
          this.dataListChecked as dataListChecked
        ).shift.filter((i: dataListCheckedShiftSubjects_type) => i.id !== id);
        return;
      }

      (this.dataListChecked.shift as dataListCheckedShiftSubjects_type[]).push({
        id,
      });
    },
    eventAddGridSubject(id: string) {
      const isExist: [] = this.dataListChecked.subjects.filter(
        (i: dataListCheckedShiftSubjects_type) => i.id === id,
      );

      if (isExist.length > 0) {
        this.dataListChecked.subjects = (
          this.dataListChecked as dataListChecked
        ).subjects.filter(
          (i: dataListCheckedShiftSubjects_type) => i.id !== id,
        );
        return;
      }

      (
        this.dataListChecked.subjects as dataListCheckedShiftSubjects_type[]
      ).push({
        id,
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
        this.dataGridTableColumns = [];
      };

      const submit = event;

      const selectRow = (submit?.srcElement as HTMLElement).querySelectorAll(
        "input:checked",
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
      console.log(this.modalValueName, this.dataListChecked);
      const createTeachers = new CreateTeachersController();
      createTeachers
        .handle({
          name: this.modalValueName,
          shiftIds: this.dataListChecked.shift,
          workload: this.modalValueWorkload,
          subjectIds: this.dataListChecked.subjects,
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
</style>
