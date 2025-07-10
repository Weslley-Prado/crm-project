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
import { InteractionRepository } from '../../ports/interaction.repository.port';
import { LLMServicePort } from '../../ports/llm.service.port';
// import { InteractionRepository } from '../../ports/interaction.repository';
// import { LLMService } from '../../ports/llm.service';

// export class CreateInteractionUseCase {
//   constructor(
//     private interactionRepository: InteractionRepository,
//     private llmService: LLMServicePort
//   ) {}

//   async execute(interaction: Interaction): Promise<Interaction> {
//     const summary = await this.llmService.summarize(interaction.content);
//     const autoResponse = await this.llmService.generateResponse(interaction.content);
//     const newInteraction = { ...interaction, summary, autoResponse };
//     return this.interactionRepository.create(newInteraction);
//   }
// }



// export class CreateInteractionUseCase {
//   constructor(
//     private interactionRepository: InteractionRepository,
//     private llmService: LLMServicePort
//   ) {}

//   async execute(interaction: Interaction): Promise<Interaction> {
//     try {
//       console.log('Creating interaction with content:', interaction.content);
//       interaction.summary = await this.llmService.summarize(interaction.content);
//       console.log('Generated summary:', interaction.summary);
//       interaction.autoResponse = await this.llmService.generateResponse(interaction.content);
//       console.log('Generated autoResponse:', interaction.autoResponse);
//       const createdInteraction = await this.interactionRepository.create(interaction);
//       console.log('Saved interaction:', createdInteraction);
//       return createdInteraction;
//     } catch (error: any) {
//       console.error('Error in CreateInteractionUseCase:', error.message, error.stack);
//       throw new Error(`Failed to create interaction: ${error.message}`);
//     }
//   }
// }



// export class CreateInteractionUseCase {
//   constructor(
//     private interactionRepository: InteractionRepository,
//     private llmService: LLMServicePort
//   ) {}

//   async execute(interaction: Interaction): Promise<Interaction> {
//     try {
//       console.log('Creating interaction with content:', interaction.content);
//       interaction.summary = await this.llmService.summarize(interaction.content);
//       console.log('Generated summary:', interaction.summary);
//       interaction.autoResponse = await this.llmService.generateResponse(interaction.content);
//       console.log('Generated autoResponse:', interaction.autoResponse);
//       const createdInteraction = await this.interactionRepository.create(interaction);
//       console.log('Saved interaction:', createdInteraction);
//       return createdInteraction;
//     } catch (error: any) {
//       console.error('Error in CreateInteractionUseCase:', error.message, error.stack);
//       throw new Error(`Failed to create interaction: ${error.message}`);
//     }
//   }
// }

// import { Interaction } from '../../entities/interaction.entity';
// import { InteractionRepository } from '../../ports/interaction.repository';
// import { LLMServicePort } from '../../ports/llm.service';

export class CreateInteractionUseCase {
  constructor(
    private interactionRepository: InteractionRepository,
    private llmService: LLMServicePort
  ) {}

  async execute(interaction: Interaction): Promise<Interaction> {
    try {
      console.log('Creating interaction with content:', interaction.content);
      interaction.summary = await this.llmService.summarize(interaction.content);
      console.log('Generated summary:', interaction.summary);
      interaction.autoResponse = await this.llmService.generateResponse(interaction.content);
      console.log('Generated autoResponse:', interaction.autoResponse);
      const createdInteraction = await this.interactionRepository.create(interaction);
      console.log('Saved interaction:', createdInteraction);
      return createdInteraction;
    } catch (error: any) {
      console.error('Error in CreateInteractionUseCase:', error.message, error.stack);
      interaction.summary = interaction.summary || 'Summary unavailable';
      interaction.autoResponse = interaction.autoResponse || 'Response unavailable';
      const createdInteraction = await this.interactionRepository.create(interaction);
      return createdInteraction;
    }
  }
}