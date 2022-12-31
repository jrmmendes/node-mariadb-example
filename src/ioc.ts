import { Container } from "inversify";
import { cards } from './cards';
import { database } from "./libraries/database";
import { config } from "./libraries/config";
import { telemetry } from "./libraries/telemetry";

const iocContainer = new Container();
iocContainer.load(config);
iocContainer.load(telemetry);
iocContainer.load(database);
iocContainer.load(cards);

export { iocContainer }
