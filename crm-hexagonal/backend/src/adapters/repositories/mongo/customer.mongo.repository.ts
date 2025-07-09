import mongoose from 'mongoose';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerRepositoryPort } from '../../../domain/ports/customer.repository.port';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
});

const CustomerModel = mongoose.model('Customer', customerSchema);

export class CustomerMongoRepository implements CustomerRepositoryPort {
  async create(customer: Customer): Promise<Customer> {
    const newCustomer = new CustomerModel(customer);
    const saved = await newCustomer.save();
    return { id: saved._id.toString(), ...customer };
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.find().exec();
    return customers.map(c => ({ id: c._id.toString(), name: c.name, email: c.email, phone: c.phone }));
  }
}