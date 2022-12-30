import { ContainerModule, decorate, injectable } from "inversify";
import { CardsController } from "./cards.controller";

decorate(injectable(), CardsController);

export const cards = new ContainerModule(bind => {
  bind(CardsController).toSelf().inRequestScope();
});
