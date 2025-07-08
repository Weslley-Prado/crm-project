import { Customer, Interaction } from '../entities/customer.entity';

export interface CustomerRepositoryPort {
  create(customer: Customer): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  addInteraction(customerId: string, interaction: Interaction): Promise<Customer>;
}