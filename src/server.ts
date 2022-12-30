import 'reflect-metadata';
import { iocContainer } from "./ioc";

import { Application } from "./application";
import { createLightship } from "lightship";
import { LoggerFactory } from "./libraries/telemetry";
import { ConfigService } from "./libraries/config";
import { MariadbDataSource } from "./libraries/database/mariadb/mariadb-datasource";

(async () => {
  const startupLogger = iocContainer
    .get(LoggerFactory)
    .createLogger('STARTUP');


  await iocContainer.get(MariadbDataSource).init();

  const configService = iocContainer.get(ConfigService);
  const { NODE_ENV: env, PORT: port } = configService.env;

  const lightship = await createLightship();

  const application = new Application();
  const server = application.instance.listen(3000, () => {
    lightship.signalReady();
  });

  lightship.registerShutdownHandler(() => {
    server.close();
  });

  await lightship.whenFirstReady();
  startupLogger.info('(%s) Application Started @ http://localhost:%d', env, port);
})();
