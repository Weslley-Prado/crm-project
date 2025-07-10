import { Interaction } from '../../entities/interaction.entity';
import { InteractionRepository } from '../../ports/interaction.repository.port';
import { LLMServicePort } from '../../ports/llm.service.port';


export class UpdateInteractionUseCase {
  constructor(
    private interactionRepository: InteractionRepository,
    private llmService: LLMServicePort
  ) {}

  async execute(id: string, interaction: Partial<Interaction>): Promise<Interaction | null> {
    if (interaction.content) {
      const summary = await this.llmService.summarize(interaction.content);
      const autoResponse = await this.llmService.generateResponse(interaction.content);
      interaction.summary = summary;
      interaction.autoResponse = autoResponse;
    }
    return this.interactionRepository.update(id, interaction);
  }
}