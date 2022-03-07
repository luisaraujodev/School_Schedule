import path from "path";
import { Classes } from "./src/database/entities/ClassesEntity";
import { GridTime } from "./src/database/entities/GridTimeEntity";
import { GridWeek } from "./src/database/entities/GridWeekEntity";
import { Schedule } from "./src/database/entities/ScheduleEntity";
import { Shift } from "./src/database/entities/ShiftEntity";
import { Subjects } from "./src/database/entities/SubjectsEntity";
import { Teachers } from "./src/database/entities/TeachersEntity";
import { TeachersRestrictions } from "./src/database/entities/TeachersRestrictionsEntity";

export default {
  type: 'sqlite',
  database: 'school_schedule.db',
  logging: false,
  synchronize: true,
  entities: [
    Classes,
    GridTime,
    GridWeek,
    Schedule,
    Shift,
    Subjects,
    Teachers,
    TeachersRestrictions,
  ],
  migrations: [path.join(__dirname, ".", "src/database/migrations", "*.{.js,.ts}")],
  cli: {
    entitiesDir: path.join(__dirname, "src/database/entities"),
    migrationsDir: path.join(__dirname, "src/database/migrations"),
  },
};
