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
      title="Vincular Turma para Professor"
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
          <Label name="Turma:" style="margin-right: auto" />
          <Input
            name="nameTeam"
            placeholder="Informe o nome da Turma"
            style="min-width: 270px"
            :disabled="true"
            :value="modalValueTeam"
          />
        </div>
        <div class="inputs-container">
          <Label name="Ensino/Curso:" style="margin-right: auto" />
          <Input
            name="nameTeaching"
            placeholder="Informe o nome do Ensino/Curso"
            style="min-width: 270px"
            :disabled="true"
            :value="modalValueTeaching"
          />
        </div>
        <div class="inputs-container">
          <Label name="Série:" style="margin-right: auto" />
          <Input
            name="nameSerie"
            placeholder="Informe o nome do Série"
            style="min-width: 270px"
            :disabled="true"
            :value="modalValueSeries"
          />
        </div>
        <div class="inputs-container">
          <Label name="Turno:" style="margin-right: auto" />
          <Input
            name="nameShift"
            placeholder="Selecione o turno"
            style="min-width: 270px"
            :disabled="true"
            :value="modalValueShift"
          />
        </div>
        <TableSimple
          id="tableSimpleModalLinkClassTeacher"
          name="tableSimpleModal"
          style="width: 100%"
        >
          <thead>
            <tr>
              <th
                v-for="tableColumns in dataGridTableColumns"
                :key="tableColumns"
              >
                <div>
                  {{ tableColumns }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tableRows in dataDisciplineWorkload"
              :key="tableRows.id"
              :disciplineId="tableRows.discipline.id"
            >
              <td>{{ tableRows.discipline.name }}</td>
              <td>{{ tableRows.workload }}</td>
              <td>
                <Select
                  name="nameTeacher"
                  placeholder="Selecione o turno"
                  style="min-width: 270px"
                  :readonly="true"
                  :option="tableRows.teacher"
                  :eventSelect="
                    (event) => {
                      this.eventSelectTeacher(event, tableRows.teacher);
                    }
                  "
                />
              </td>
              <td>
                <Input
                  name="nameConsecutiveClasses"
                  type="number"
                  style="width: 100%"
                  :value="tableRows.consecutiveClasses || 1"
                />
              </td>
            </tr>
          </tbody>
        </TableSimple>
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
  CreateLinkClassTeacherController,
  createLinkClassTeacherType,
} from "@/database/controllers/CreateLinkClassTeacherController";
import { GetIDLinkClassTeacherController } from "@/database/controllers/GetIDLinkClassTeacherController";
import { GetIDTeamController } from "@/database/controllers/GetIDTeamController";
import { GetAllTeachersController } from "@/database/controllers/GetAllTeachersController";
import { HTMLAttributes } from "@vue/runtime-dom";
import { Teachers } from "../../database/entities/TeachersEntity";
import { Subjects } from "@/database/entities/SubjectsEntity";
import { LinkClassTeacherEntity } from "@/database/entities/LinkClassTeacherEntity";

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

interface HTMLInputElementExtra extends HTMLInputElement {
  ariaSelected: HTMLAttributes;
}

interface FORMIMPUTSSUBMIT extends HTMLInputElement {
  nameTeacher?: HTMLInputElementExtra;
  nameConsecutiveClasses?: HTMLInputElementExtra;
}

type LinkClassTeacher = {
  teamId: string;
  consecutiveClasses: number;
  disciplineId: string;
  teacherId: string;
};

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
    teamId: String,
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
      modalValueTeaching: "",
      modalValueSeries: "",
      modalValueShift: "",
      modalOptionTeachers: [],
      dataGridTableColumns: [
        "Disciplina",
        "Aulas",
        "Professor",
        "Aulas Consecutivas",
      ],
      dataGridTableRows: [],
      dataDisciplineWorkload: [],
      dataTeachers: [],
      dataLinkClassTeacher: [],
    };
  },
  mounted() {
    this.loadOptions(this.teamId);
  },
  methods: {
    loadOptions(teamId: string) {
      this.popupConfig.open = true;
      this.popupConfig.title = "Aviso";
      this.popupConfig.description = "Carregando...";
      this.popupConfig.isInfo = true;

      const loandExistLinkClassTeacher = new Promise((resolve, reject) => {
        const getIDLinkClassTeacher = new GetIDLinkClassTeacherController();
        return getIDLinkClassTeacher.handle({ teamId }).then((result) => {
          if (result instanceof Error) {
            reject(new Error(result.message));
            return;
          }
          this.dataLinkClassTeacher = result;
          console.log("getIDLinkClassTeacher", result);
          resolve("sucess");
        });
      });

      loandExistLinkClassTeacher.then(() => {
        const loandIDTeam = new Promise((resolve, reject) => {
          const getIDTeam = new GetIDTeamController();
          return getIDTeam.handle({ teamId }).then((result) => {
            if (result instanceof Error) {
              reject(new Error(result.message));
              return;
            }

            this.modalValueTeam = result?.name;
            this.modalValueTeaching = "result?.teaching";
            this.modalValueSeries = result?.series.name;
            this.modalValueShift = result?.shift.name;

            this.dataGridTableRows = result?.series?.disciplineWorkload;

            result?.series?.disciplineWorkload.forEach((disciplineWorkload) => {
              let loandConsecutiveClasses = 1;

              const dataTeacher = (this.dataTeachers as Teachers[]).filter(
                (teachers) => {
                  const listTeachers = teachers.subjects?.filter((teacher) => {
                    return teacher.id == disciplineWorkload?.subjects?.id;
                  });
                  return listTeachers.length > 0;
                }
              );

              const optionDataTeacher: tOption[] = dataTeacher.flatMap((i) => {
                const selecLoad = (
                  this.dataLinkClassTeacher as LinkClassTeacherEntity[]
                ).filter((linker) => {
                  return (
                    linker.teacher.id === i.id &&
                    linker.subject.id === disciplineWorkload.subjects.id
                  );
                });

                console.log(this.dataLinkClassTeacher, selecLoad);
                if (selecLoad.length > 0) {
                  loandConsecutiveClasses = selecLoad[0].consecutiveClasses;
                }

                return {
                  value: i.id,
                  name: i.name,
                  selected: selecLoad.length > 0,
                };
              });

              this.dataDisciplineWorkload.push({
                discipline: disciplineWorkload.subjects,
                workload: disciplineWorkload.workload,
                teacher: optionDataTeacher,
                consecutiveClasses: loandConsecutiveClasses,
              });
            });

            console.log("dataDisciplineWorkload", this.dataDisciplineWorkload);
            resolve("sucess");
            console.log("getIDTeam", result);
          });
        });

        const loandAllTeachers = new Promise((resolve, reject) => {
          const getAllTeachers = new GetAllTeachersController();
          return getAllTeachers.handle().then((result) => {
            if (result instanceof Error) {
              reject(new Error(result.message));
              return;
            }

            (this.modalOptionTeachers as tOption[]) = result.flatMap((i) => ({
              value: i.id,
              name: i.name,
            }));

            this.dataTeachers = result;
            resolve("sucess");
            console.log("loandAllTeachers", result);
          });
        });

        Promise.all([loandIDTeam, loandAllTeachers])
          .then((result) => {
            setTimeout(() => {
              this.closePopup();
              this.modalConfig.open = true;
            }, 500);
          })
          .catch((error) => {
            this.closePopup();
            this.popupConfig.open = true;
            this.popupConfig.title = "Erro";
            this.popupConfig.description = error.message;
            this.popupConfig.isErro = true;
            this.popupConfig.event = this.closePopup;
          });
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
    eventSelectTeacher(select: tOption, options: tOption[]) {
      options.map((op) => {
        op.selected = op.value == select.value;
        return op;
      });
    },
    clickSubmitModalCreate(event: SubmitEvent) {
      event.preventDefault();
      if (!event.srcElement) {
        return;
      }
      //tableSimpleModalLinkClassTeacher
      const table = (event.srcElement as HTMLInputElement).querySelectorAll(
        "#tableSimpleModalLinkClassTeacher [disciplineId]"
      );
      console.log(table);

      let linkClassTeacher: LinkClassTeacher[] = [];

      table.forEach((row) => {
        const nameTeacher = row.querySelector(
          "input[name='nameTeacher']"
        ) as HTMLInputElementExtra;
        const nameConsecutiveClasses = row.querySelector(
          "input[name='nameConsecutiveClasses']"
        ) as HTMLInputElementExtra;

        if (!nameTeacher) {
          return;
        }

        if (!nameConsecutiveClasses) {
          return;
        }

        if (String(nameTeacher.ariaSelected).length == 0) {
          return;
        }

        linkClassTeacher.push({
          teamId: String(this.teamId),
          disciplineId: row.getAttribute("disciplineId") || "",
          teacherId: String(nameTeacher.ariaSelected),
          consecutiveClasses: Number(nameConsecutiveClasses.value) || 1,
        });
      });

      console.log("linkClassTeacher", linkClassTeacher);

      // const { nameTeacher, nameConsecutiveClasses }: FORMIMPUTSSUBMIT =
      //   event.srcElement as FORMIMPUTSSUBMIT;

      if (linkClassTeacher.length === 0) {
        this.closePopup();
        this.popupConfig.open = true;
        this.popupConfig.title = "Erro";
        this.popupConfig.description =
          "É necessário informar um dia e uma aula";
        this.popupConfig.isErro = true;
        this.popupConfig.event = this.closePopup;
        return;
      }

      const createLinkClassTeacher = new CreateLinkClassTeacherController();
      createLinkClassTeacher
        .handle({ linkClassTeacheres: linkClassTeacher })
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
