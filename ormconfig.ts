import path from "path";
import { Classes } from "./src/database/entities/ClassesEntity";
import { GridTime } from "./src/database/entities/GridTimeEntity";
import { Schedule } from "./src/database/entities/ScheduleEntity";
import { ScheduleDetail } from "./src/database/entities/ScheduleDetailEntity";
import { Shift } from "./src/database/entities/ShiftEntity";
import { ShiftDetail } from "./src/database/entities/ShiftDetailEntity";
import { Teaching } from "./src/database/entities/TeachingEntity";
import { Subjects } from "./src/database/entities/SubjectsEntity";
import { Teachers } from "./src/database/entities/TeachersEntity";
import { TeachersRestrictions } from "./src/database/entities/TeachersRestrictionsEntity";
import { Series } from "./src/database/entities/SeriesEntily";
import { DisciplineWorkload } from "./src/database/entities/DisciplineWorkloadEntity";
import { Team } from "./src/database/entities/TeamEntity";
import { TeamDetail } from "./src/database/entities/TeamDetailEntity";
import { LinkClassTeacherEntity } from "./src/database/entities/LinkClassTeacherEntity";
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

export default {
  type: 'sqlite',
  database: 'database/school_schedule.db',
  logging: false,
  synchronize: true,
  entities: [
    Classes,
    GridTime,
    Schedule,
    ScheduleDetail,
    Shift,
    ShiftDetail,
    Teaching,
    Subjects,
    Teachers,
    TeachersRestrictions,
    Series,
    DisciplineWorkload,
    Team,
    TeamDetail,
    LinkClassTeacherEntity,
  ],
  migrations: [path.join(__dirname, ".", "src/database/migrations", "*.{.js,.ts}")],
  cli: {
    entitiesDir: path.join(__dirname, "src/database/entities"),
    migrationsDir: path.join(__dirname, "src/database/migrations"),
  },
};
