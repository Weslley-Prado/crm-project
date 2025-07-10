import { Interaction } from '../../entities/interaction.entity';
import { InteractionRepository } from '../../ports/interaction.repository.port';

export class GetInteractionUseCase {
  constructor(private interactionRepository: InteractionRepository) {}

  async execute(id: string): Promise<Interaction | null> {
    return this.interactionRepository.findById(id);
  }
}