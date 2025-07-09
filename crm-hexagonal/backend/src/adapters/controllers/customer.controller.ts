import express from 'express';
import { CreateCustomerUseCase } from '../../domain/use-cases/customer/create-customer.use-case';
import { ListCustomersUseCase } from '../../domain/use-cases/customer/list-customers.use-case';
import { Customer } from '../../domain/entities/customer.entity';

export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listCustomersUseCase: ListCustomersUseCase
  ) {}

  registerRoutes(app: express.Application) {
    app.post('/customers', async (req, res) => {
      try {
        const customer: Customer = req.body;
        const result = await this.createCustomerUseCase.execute(customer);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
      }
    });

    app.get('/customers', async (req, res) => {
      try {
        const customers = await this.listCustomersUseCase.execute();
        res.json(customers);
      } catch (error) {
        res.status(500).json({ error: 'Failed to list customers' });
      }
    });
  }
}