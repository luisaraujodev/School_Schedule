/* eslint-disable */
import { createConnection, ConnectionOptions } from "typeorm";
import config from "../../ormconfig";

export const createConnectionDB = async () => {
  config.database = process.env.DB_NAME || 'database/school_schedule.db';
  
  await createConnection(config as ConnectionOptions).then(() => {
    console.log("sucesso conection servidor");
  }).catch((e: Error) => {
    console.log("Erro sucesso conection servidor", e.message, config);
  });
};
