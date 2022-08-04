/* eslint-disable*/
import fs from "fs";
import { connectDataBaseConfig_type } from "../types/ConnectDataBaseConfig";

export class CreateConnectDataBaseConfig {
  async execute({ institution, path,lang }: connectDataBaseConfig_type): Promise<string | Error> {

    const configDataBase: connectDataBaseConfig_type = {
      institution: institution || "",
      path: path + "database/school_schedule.db",
      lang: lang || "",
      created_at: new Date().toJSON(),
    }

    fs.writeFile("school_schedule.config", JSON.stringify(configDataBase), (err) => {
      if (err) {
        return new Error("Config incorret");
      }
      return "The file was saved!";
    });

    return "The file was saved!";
  }
}
