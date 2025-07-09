import express from 'express';
import { connectDB } from './infrastructure/config/database';
import { CustomerMongoRepository } from './adapters/repositories/mongo/customer.mongo.repository';
import { InteractionMongoRepository } from './adapters/repositories/mongo/interaction.mongo.repository';
import { HuggingFaceService } from './adapters/services/llm/huggingface.service';
import { CreateCustomerUseCase } from './domain/use-cases/customer/create-customer.use-case';
import { ListCustomersUseCase } from './domain/use-cases/customer/list-customers.use-case';
import { CreateInteractionUseCase } from './domain/use-cases/interaction/create-interaction.use-case';
import { ListInteractionsUseCase } from './domain/use-cases/interaction/list-interactions.use-case';
import { CustomerController } from './adapters/controllers/customer.controller';
import { InteractionController } from './adapters/controllers/interaction.controller';
import { environment } from './infrastructure/config/environment';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const customerRepository = new CustomerMongoRepository();
const interactionRepository = new InteractionMongoRepository();
const llmService = new HuggingFaceService();

const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
const listCustomersUseCase = new ListCustomersUseCase(customerRepository);
const createInteractionUseCase = new CreateInteractionUseCase(interactionRepository, llmService);
const listInteractionsUseCase = new ListInteractionsUseCase(interactionRepository);

const customerController = new CustomerController(createCustomerUseCase, listCustomersUseCase);
const interactionController = new InteractionController(createInteractionUseCase, listInteractionsUseCase);

customerController.registerRoutes(app);
interactionController.registerRoutes(app);

app.listen(environment.port, () => {
  console.log(`Server running on port ${environment.port}`);
});

function cors(): any {
  throw new Error('Function not implemented.');
}
