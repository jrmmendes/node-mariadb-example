import {iocContainer} from "./ioc";
import { ConfigService } from "./libraries/config";
const config = iocContainer.get(ConfigService);

export default config.datasources.mariadb;
