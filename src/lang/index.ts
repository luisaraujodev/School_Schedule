import pt_br_MessagesGenerated from "./pt-br/messages.generated.json";

type messagestype = {
  CLASSES_ALREADY_EXISTS: string,
  GRIDTIME_ALREADY_EXISTS: string,
  GRIDWEEK_ALREADY_EXISTS: string,
  SCHEDULE_ALREADY_EXISTS: string,
  SHIFT_DOES_NOT_EXISTS: string,
  SHIFT_EXISTS: string,
  SUBJECT_DOES_NOT_EXISTS: string,
  TEACHER_DOES_NOT_EXISTS: string,
  WORKLOAD_INCORRET: string,
  ERROR_UNABLE_TO_REGISTER: string,
  MANDATORY_NAME: string,
  MANDATORY_NICKNAME: string,
  NAME_OR_SURNAME_ALREADY_EXISTS: string,
}

const messagesLang = (): messagestype => {
  switch (process.env.LANG) {
    case "pt-br":
      return pt_br_MessagesGenerated as messagestype;
    default:
      return pt_br_MessagesGenerated as messagestype;
  }
};

export default messagesLang();
