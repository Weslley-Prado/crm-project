import { InteractionRepository } from "../../ports/interaction.repository.port";

export class DeleteInteractionUseCase {
  constructor(private interactionRepository: InteractionRepository) {}

  async execute(id: string): Promise<void> {
    await this.interactionRepository.delete(id);
  }
}