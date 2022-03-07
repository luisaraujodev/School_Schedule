/* eslint-disable*/
import fs from "fs";
import { connectDataBaseConfig_type } from "../types/ConnectDataBaseConfig";

export class GetConnectDataBaseConfig {
  async execute(): Promise<string | Error> {

    if (!fs.existsSync('school_schedule.config')) {
      return new Error("school_schedule config not exist");
    }

    try {
      const getFileConfig: connectDataBaseConfig_type = JSON.parse(fs.readFileSync('school_schedule.config', 'utf8'));
      process.env.DB_INSTITUTION = getFileConfig.institution;
      process.env.DB_NAME = getFileConfig.path;
      return "succes";
    } catch (err: any) {
      return err;
    }
  }
}
