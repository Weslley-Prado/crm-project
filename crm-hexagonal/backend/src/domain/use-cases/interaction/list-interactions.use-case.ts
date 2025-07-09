import { Interaction } from '../../entities/interaction.entity';
import { InteractionRepositoryPort } from '../../ports/interaction.repository.port';

export class ListInteractionsUseCase {
  constructor(private readonly interactionRepository: InteractionRepositoryPort) {}

  async execute(customerId: string): Promise<Interaction[]> {
    return this.interactionRepository.findByCustomerId(customerId);
  }
}