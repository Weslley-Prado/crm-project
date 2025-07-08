import { CustomerRepositoryPort } from '../ports/customer.repository.port';
import { LlmServicePort } from '../ports/llm.service.port';
import { Customer, Interaction } from '../entities/customer.entity';

export class CustomerService {
  constructor(
    private customerRepository: CustomerRepositoryPort,
    private llmService: LlmServicePort
  ) {}

  async createCustomer(customer: Customer): Promise<Customer> {
    return await this.customerRepository.create(customer);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return await this.customerRepository.findAll();
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    return await this.customerRepository.findById(id);
  }

  async addInteraction(customerId: string, content: string): Promise<Customer> {
    const summary = await this.llmService.generateSummary(content);
    const autoResponse = await this.llmService.generateResponse(content);
    const interaction: Interaction = { date: new Date(), content, summary, autoResponse };
    return await this.customerRepository.addInteraction(customerId, interaction);
  }

  async chatWithAssistant(message: string): Promise<string> {
    return await this.llmService.chat(message);
  }
}