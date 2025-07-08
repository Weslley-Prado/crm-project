import { Router } from 'express';
import { CustomerService } from '../../domain/services/customer.service';
import { MongoDBCustomerRepository } from '../repositories/mongodb/customer.repository';
import { HuggingFaceAdapter } from '../llm/huggingface.adapter';

export const customerRoutes = Router();
const customerService = new CustomerService(
  new MongoDBCustomerRepository(),
  new HuggingFaceAdapter()
);

customerRoutes.post('/', async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

customerRoutes.get('/', async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

customerRoutes.get('/:id', async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

customerRoutes.post('/:id/interactions', async (req, res) => {
  try {
    const customer = await customerService.addInteraction(req.params.id, req.body.content);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add interaction' });
  }
});

customerRoutes.post('/chat', async (req, res) => {
  try {
    const response = await customerService.chatWithAssistant(req.body.message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat' });
  }
});