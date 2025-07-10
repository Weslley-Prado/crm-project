
import express from 'express';
import { connectDB } from './infrastructure/config/database';
import { CustomerMongoRepository } from './adapters/repositories/mongo/customer.mongo.repository';
import { InteractionMongoRepository } from './adapters/repositories/mongo/interaction.mongo.repository';
import { HuggingFaceService } from './adapters/services/llm/huggingface.service';
import { CreateCustomerUseCase } from './domain/use-cases/customer/create-customer.use-case';
import { ListCustomersUseCase } from './domain/use-cases/customer/list-customers.use-case';
import { CreateInteractionUseCase } from './domain/use-cases/interaction/create-interaction.use-case';
import { ListInteractionsUseCase } from './domain/use-cases/interaction/list-interactions.use-case';
import { GetInteractionUseCase } from './domain/use-cases/interaction/get-interaction.use-case';
import { UpdateInteractionUseCase } from './domain/use-cases/interaction/update-interaction.use-case';
import { DeleteInteractionUseCase } from './domain/use-cases/interaction/delete-interaction.use-case';
import { CustomerController } from './adapters/controllers/customer.controller';
import { InteractionController } from './adapters/controllers/interaction.controller';
import { environment } from './infrastructure/config/environment';
import cors from 'cors'; // Ensure cors is imported

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const customerRepository = new CustomerMongoRepository();
const interactionRepository = new InteractionMongoRepository();
const llmService = new HuggingFaceService();

const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
const listCustomersUseCase = new ListCustomersUseCase(customerRepository);
const createInteractionUseCase = new CreateInteractionUseCase(interactionRepository, llmService);
const listInteractionsUseCase = new ListInteractionsUseCase(interactionRepository);
const getInteractionUseCase = new GetInteractionUseCase(interactionRepository);
const updateInteractionUseCase = new UpdateInteractionUseCase(interactionRepository, llmService);
const deleteInteractionUseCase = new DeleteInteractionUseCase(interactionRepository);

const customerController = new CustomerController(createCustomerUseCase, listCustomersUseCase);
const interactionController = new InteractionController(
  createInteractionUseCase,
  listInteractionsUseCase,
  listInteractionsUseCase,
  getInteractionUseCase,
  updateInteractionUseCase,
  deleteInteractionUseCase
);

customerController.registerRoutes(app);
interactionController.registerRoutes(app);

app.listen(environment.port, () => {
  console.log(`Server running on port ${environment.port}`);
});


