import { Customer } from '../../entities/customer.entity';
import { CustomerRepositoryPort } from '../../ports/customer.repository.port';

export class ListCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepositoryPort) {}

  async execute(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }
}