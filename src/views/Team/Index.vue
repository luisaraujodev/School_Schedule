<template>
  <div class="page-container">
    <LinkerTeam
      v-if="openLinker"
      :teamId="teamId"
      :clickClose="
        () => {
          this.openLinker = false;
        }
      "
    />
    <CreateTeam
      v-if="openCreate"
      :clickClose="
        () => {
          this.openCreate = false;
        }
      "
    />
    <TitlePage />
    <Table
      title="Resultado"
      :dataColumns="dataColumns"
      :dataRows="dataRows"
      :radio="true"
      :clickbtnSubmit="clickbtnSubmitTable"
    >
      <div class="buttons-container">
        <Button name="teamNew" theme="green" type="submit"> Novo </Button>
        <Button name="teamLink" type="submit" icon="link"></Button>
        <Button
          name="teamEdit"
          type="submit"
          icon="edit"
          theme="line-blue"
        ></Button>
        <Button
          name="teamDelete"
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
import { GetAllTeamController } from "@/database/controllers/GetAllTeamController";
import CreateTeam from "./CreateTeam.vue";
import LinkerTeam from "./LinkerTeam.vue";

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

@Options({
  components: {
    TitlePage,
    Button,
    Table,
    CreateTeam,
    LinkerTeam,
  },
  data() {
    return {
      openCreate: false,
      openLinker: false,
      teamId: String,
      dataColumns: [
        {
          name: "id",
          style: "display:none",
        },
        {
          name: "Nome",
        },
        {
          name: "Turno",
        },
        {
          name: "Série",
        },
        {
          name: "Data de Criação",
        },
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

      const loandAllTeam = new Promise((resolve, reject) => {
        const getAllTeam = new GetAllTeamController();
        getAllTeam.handle().then((result) => {
          if (result instanceof Error) {
            reject(new Error(result.message));
            return;
          }

          this.dataRows = result.flatMap((i) => {
            const flatMapResult = {
              id: i.id,
              name: i.name,
              shift: i.shift.name,
              series: i.series.name,
              created_at: new Date(i.created_at).toLocaleString(),
            };
            return flatMapResult;
          });
        });
      });

      Promise.all([loandAllTeam])
        .then((result) => {
          const isTotalSucess = result.filter((i) => i === "sucess");
          if (isTotalSucess.length === 3) {
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
        "input:checked",
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
  },
})
export default class PageContainer extends Vue {}
</script>

<style lang="scss" scoped >
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
