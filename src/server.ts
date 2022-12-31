import 'reflect-metadata';
import { iocContainer } from "./ioc";

import { Application } from "./application";
import { createLightship } from "lightship";
import { LoggerFactory } from "./libraries/telemetry";
import { ConfigService } from "./libraries/config";

(async () => {
  const startupLogger = iocContainer
    .get(LoggerFactory)
    .createLogger('STARTUP');

  const configService = iocContainer.get(ConfigService);

  await Promise.all(
    configService
      .datasourcesList
      .map(source => source.initialize())
  );

  const { NODE_ENV: env, PORT: port } = configService.env;

  const application = new Application();

  const lightship = await createLightship();

  const server = application.instance.listen(3000, () => {
    lightship.signalReady();
  });

  lightship.registerShutdownHandler(() => {
    server.close();
  });

  await lightship.whenFirstReady();
  startupLogger.info('(%s) Application Started @ http://localhost:%d', env, port);
})();
