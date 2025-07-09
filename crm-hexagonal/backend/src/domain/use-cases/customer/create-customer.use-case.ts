import { Customer } from '../../entities/customer.entity';
import { CustomerRepositoryPort } from '../../ports/customer.repository.port';

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepositoryPort) {}

  async execute(customer: Customer): Promise<Customer> {
    return this.customerRepository.create(customer);
  }
}