import { Interaction } from '../entities/interaction.entity';

// export interface InteractionRepositoryPort {
//   create(interaction: Interaction): Promise<Interaction>;
//   findByCustomerId(customerId: string): Promise<Interaction[]>;
// }


export interface InteractionRepository {
  create(interaction: Interaction): Promise<Interaction>;
  findByCustomerId(customerId: string): Promise<Interaction[]>;
  findAll(): Promise<Interaction[]>;
  findById(id: string): Promise<Interaction | null>;
  update(id: string, interaction: Partial<Interaction>): Promise<Interaction | null>;
  delete(id: string): Promise<void>;
}