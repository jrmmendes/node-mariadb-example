import { Get, Post, Route } from 'tsoa';
import { Logger, LoggerFactory } from "../libraries/telemetry";
import { inject } from "inversify";
import { CardsEntity } from "./cards.entity";
import { Repository } from "typeorm";
import { RepositoryFactory } from "../libraries/database/repository-factory";

@Route('cards')
export class CardsController {
  private readonly logger: Logger;
  private repository: Repository<CardsEntity>;

  constructor(
    @inject(LoggerFactory)
    private readonly loggerFactory: LoggerFactory,

    @inject(RepositoryFactory)
    private readonly repositoryFactory: RepositoryFactory<CardsEntity>,

  ) {
    this.logger = loggerFactory.createLogger('Controller: Cards');
    this.repository = repositoryFactory.createRepository('mariadb', CardsEntity);
  }

  @Get()
  async getCards() {
    this.logger.info('FETCH CARDS');
    const cards = await this.repository.find();

    return {
      cards
    }
  }

  @Post()
  async createCard() {
    const newCard = new CardsEntity();
    await this.repository.save(newCard);
    return { newCard };
  }
}
