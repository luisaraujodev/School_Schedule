<template>
  <div class="page-container">
    <Modal
      :title="
        modalConfig.type == 'new' ? 'Novo Horario de Aula' : 'Atualizar Horario de Aula'
      "
      description="Gerencie as vagas dos candidatos e preencha as seguintes informações"
      v-if="modalConfig.open"
      :clickbtnSubmit="clickCreateNewgridTime"
      :eventOpenModal="
        () => {
          this.modalConfig.open = false;
        }
      "
    >
      <div>
        <div class="inputs-container">
          <Label name="Nome do Horario:" style="margin-right: auto" />
          <Input
            name="nameGridTime"
            placeholder="Informe o Horario"
            style="width: 280px"
            :value="modalValueName"
            :keyup="eventkeyupModalValue"
          />
        </div>
        <div class="buttonsModal-container">
          <Button
            name="gridTimeClose"
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
            <Button name="gridTimeUpdate" theme="green" type="submit">
              Atualizar Turno
            </Button>
          </div>
          <div v-if="modalConfig.type == 'new'">
            <Button name="gridTimeNew" theme="green" type="submit">
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
        <Button name="gridTimeNew" theme="green" type="submit"> Novo </Button>
        <Button
          name="gridTimeEdit"
          type="submit"
          icon="edit"
          theme="line-blue"
        ></Button>
        <Button
          name="gridTimeDelete"
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

// consult api
import {
  createGridTimeType,
  CreateGridTimeController,
} from "@/database/controllers/CreateGridTimeController";
import { GetAllGridTimeController } from "@/database/controllers/GetAllGridTimeController";

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

@Options({
  components: {
    TitlePage,
    Button,
    Table,
    Modal,
    Label,
    Input,
  },
  data() {
    return {
      modalValueName: "",
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
    };
  },
  mounted() {
    const getAllGridTime = new GetAllGridTimeController();
    getAllGridTime
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
            created_at: i.created_at,
          };
          return flatMapResult;
        });

        console.log("getAllGridTime", result);
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

      if ((event.srcElement as HTMLInputElement).name === "nameGridTime") {
        this.modalValueName = getValue;
      } else {
        this.nickNameGridTime = getValue;
      }
    },
    clickbtnSubmitTable(event: SubmitEvent) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const eventEdit = (gridTimeId: string) => {};

      const eventNew = () => {
        this.modalConfig = {
          open: true,
          type: "new",
        };
        this.modalValueGridTime = "";
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
        case "gridTimeNew":
          eventNew();
          break;
        case "gridTimeEdit":
          eventEdit(selectRow[0].id);
          break;
        case "gridTimeDelete":
          break;
      }
    },
    clickCreateNewgridTime(event: SubmitEvent) {
      event.preventDefault();
      console.log(this.modalValueName);
      const createGridTime = new CreateGridTimeController();
      createGridTime
        .handle({ name: this.modalValueName })
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
  justify-content: right;
  max-width: 600px;
  margin: 0 auto;

  > div {
    display: flex;
    flex-direction: row;
    margin: 4px 0;
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
