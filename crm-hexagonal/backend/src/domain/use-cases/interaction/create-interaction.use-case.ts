// import { Interaction } from '../../entities/interaction.entity';
// import { InteractionRepositoryPort } from '../../ports/interaction.repository.port';
// import { LLMServicePort } from '../../ports/llm.service.port';

// export class CreateInteractionUseCase {
//   constructor(
//     private readonly interactionRepository: InteractionRepositoryPort,
//     private readonly llmService: LLMServicePort
//   ) {}

//   async execute(interaction: Interaction): Promise<Interaction> {
//     const summary = await this.llmService.summarize(interaction.content);
//     const autoResponse = await this.llmService.generateResponse(interaction.content);
//     const newInteraction = { ...interaction, summary, autoResponse };
//     return this.interactionRepository.create(newInteraction);
//   }
// }
import { Interaction } from '../../entities/interaction.entity';
import { InteractionRepositoryPort } from '../../ports/interaction.repository.port';
import { LLMServicePort } from '../../ports/llm.service.port';
// import { InteractionRepository } from '../../ports/interaction.repository';
// import { LLMService } from '../../ports/llm.service';

export class CreateInteractionUseCase {
  constructor(
    private interactionRepository: InteractionRepositoryPort,
    private llmService: LLMServicePort
  ) {}

  async execute(interaction: Interaction): Promise<Interaction> {
    const summary = await this.llmService.summarize(interaction.content);
    const autoResponse = await this.llmService.generateResponse(interaction.content);
    const newInteraction = { ...interaction, summary, autoResponse };
    return this.interactionRepository.create(newInteraction);
  }
}