// import express from 'express';
// import { CreateInteractionUseCase } from '../../domain/use-cases/interaction/create-interaction.use-case';
// import { ListInteractionsUseCase } from '../../domain/use-cases/interaction/list-interactions.use-case';
// import { Interaction } from '../../domain/entities/interaction.entity';

// export class InteractionController {
//   constructor(
//     private readonly createInteractionUseCase: CreateInteractionUseCase,
//     private readonly listInteractionsUseCase: ListInteractionsUseCase
//   ) {}

//   registerRoutes(app: express.Application) {
//     app.post('/interactions', async (req, res) => {
//       try {
//         const interaction: Interaction = { ...req.body, timestamp: new Date() };
//         const result = await this.createInteractionUseCase.execute(interaction);
//         res.status(201).json(result);
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to create interaction' });
//       }
//     });

//     app.get('/interactions/:customerId', async (req, res) => {
//       try {
//         const customerId = req.params.customerId;
//         const interactions = await this.listInteractionsUseCase.execute(customerId);
//         res.json(interactions);
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to list interactions' });
//       }
//     });
//   }
// }

import { Application } from 'express';
import { CreateInteractionUseCase } from '../../domain/use-cases/interaction/create-interaction.use-case';
import { ListInteractionsUseCase } from '../../domain/use-cases/interaction/list-interactions.use-case';

export class InteractionController {
  constructor(
    private createInteractionUseCase: CreateInteractionUseCase,
    private listInteractionsUseCase: ListInteractionsUseCase
  ) {}

  registerRoutes(app: Application): void {
    app.post('/interactions', async (req, res) => {
      try {
        const interaction = await this.createInteractionUseCase.execute(req.body);
        res.status(201).json(interaction);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create interaction' });
      }
    });

    app.get('/interactions/:customerId', async (req, res) => {
      try {
        const interactions = await this.listInteractionsUseCase.execute(req.params.customerId);
        res.json(interactions);
      } catch (error) {
        res.status(500).json({ error: 'Failed to list interactions' });
      }
    });
  }
}