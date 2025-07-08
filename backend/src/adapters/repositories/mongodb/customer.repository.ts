import mongoose from 'mongoose';
import { CustomerRepositoryPort } from '../../../domain/ports/customer.repository.port';
import { Customer, Interaction } from '../../../domain/entities/customer.entity';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  interactions: [{
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    summary: String,
    autoResponse: String
  }]
});

const CustomerModel = mongoose.model('Customer', customerSchema);

export class MongoDBCustomerRepository implements CustomerRepositoryPort {
  async create(customer: Customer): Promise<Customer> {
    const newCustomer = new CustomerModel(customer);
    const saved = await newCustomer.save();
    return saved.toObject() as Customer;
  }

  async findAll(): Promise<Customer[]> {
    return await CustomerModel.find();
  }

  async findById(id: string): Promise<Customer | null> {
    return await CustomerModel.findById(id);
  }

  async addInteraction(customerId: string, interaction: Interaction): Promise<Customer> {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      customerId,
      { $push: { interactions: interaction } },
      { new: true }
    );
    if (!updatedCustomer) {
      throw new Error('Customer not found');
    }
    return updatedCustomer as Customer;
  }
}