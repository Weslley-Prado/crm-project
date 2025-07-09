import { Interaction } from '../entities/interaction.entity';

export interface InteractionRepositoryPort {
  create(interaction: Interaction): Promise<Interaction>;
  findByCustomerId(customerId: string): Promise<Interaction[]>;
}