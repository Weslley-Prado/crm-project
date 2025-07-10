import { Interaction } from '../../entities/interaction.entity';
import { InteractionRepository } from '../../ports/interaction.repository.port';

export class ListInteractionsUseCase {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(customerId: string): Promise<Interaction[]> {
    return this.interactionRepository.findByCustomerId(customerId);
  }
}