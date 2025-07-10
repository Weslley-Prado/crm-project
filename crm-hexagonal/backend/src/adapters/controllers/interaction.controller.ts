// import { Application } from 'express';
// import { CreateInteractionUseCase } from '../../domain/use-cases/interaction/create-interaction.use-case';
// import { ListInteractionsUseCase } from '../../domain/use-cases/interaction/list-interactions.use-case';
// import { GetInteractionUseCase } from '../../domain/use-cases/interaction/get-interaction.use-case';
// import { UpdateInteractionUseCase } from '../../domain/use-cases/interaction/update-interaction.use-case';
// import { DeleteInteractionUseCase } from '../../domain/use-cases/interaction/delete-interaction.use-case';

// export class InteractionController {
//   constructor(
//     private createInteractionUseCase: CreateInteractionUseCase,
//     private listInteractionsUseCase: ListInteractionsUseCase,
//     private listAllInteractionsUseCase: ListInteractionsUseCase,
//     private getInteractionUseCase: GetInteractionUseCase,
//     private updateInteractionUseCase: UpdateInteractionUseCase,
//     private deleteInteractionUseCase: DeleteInteractionUseCase
//   ) {}

//   registerRoutes(app: Application): void {
//     app.post('/interactions', async (req, res) => {
//       try {
//         console.log('Received POST /interactions with body:', req.body);
//         const interaction = await this.createInteractionUseCase.execute(req.body);
//         res.status(201).json(interaction);
//       } catch (error: any) {
//         console.error('Error in POST /interactions:', error.message, error.stack);
//         res.status(500).json({ error: 'Failed to create interaction', details: error.message });
//       }
//     });

//     app.get('/interactions/:customerId', async (req, res) => {
//       try {
//         const interactions = await this.listInteractionsUseCase.execute(req.params.customerId);
//         res.json(interactions);
//       } catch (error: any) {
//         console.error('Error in GET /interactions/:customerId:', error.message, error.stack);
//         res.status(500).json({ error: 'Failed to list interactions', details: error.message });
//       }
//     });

//     app.get('/interactions', async (req, res) => {
//       try {
//         const interactions = await this.listAllInteractionsUseCase.execute(req.query.customerId as string);
//         res.json(interactions);
//       } catch (error: any) {
//         console.error('Error in GET /interactions:', error.message, error.stack);
//         res.status(500).json({ error: 'Failed to list all interactions', details: error.message });
//       }
//     });

//     app.get('/interactions/id/:id', async (req, res) => {
//       try {
//         const interaction = await this.getInteractionUseCase.execute(req.params.id);
//         if (!interaction) return res.status(404).json({ error: 'Interaction not found' });
//         res.json(interaction);
//       } catch (error: any) {
//         console.error('Error in GET /interactions/id/:id:', error.message, error.stack);
//         res.status(500).json({ error: 'Failed to get interaction', details: error.message });
//       }
//     });

//     app.put('/interactions/:id', async (req, res) => {
//       try {
//         const interaction = await this.updateInteractionUseCase.execute(req.params.id, req.body);
//         if (!interaction) return res.status(404).json({ error: 'Interaction not found' });
//         res.json(interaction);
//       } catch (error: any) {
//         console.error('Error in PUT /interactions/:id:', error.message, error.stack);
//         res.status(500).json({ error: 'Failed to update interaction', details: error.message });
//       }
//     });

//     app.delete('/interactions/:id', async (req, res) => {
//       try {
//         await this.deleteInteractionUseCase.execute(req.params.id);
//         res.status(204).send();
//       } catch (error: any) {
//         console.error('Error in DELETE /interactions/:id:', error.message, error.stack);
//         res.status(500).json({ error: 'Failed to delete interaction', details: error.message });
//       }
//     });
//   }
// }

import { Application } from 'express';
import { CreateInteractionUseCase } from '../../domain/use-cases/interaction/create-interaction.use-case';
import { ListInteractionsUseCase } from '../../domain/use-cases/interaction/list-interactions.use-case';
import { GetInteractionUseCase } from '../../domain/use-cases/interaction/get-interaction.use-case';
import { UpdateInteractionUseCase } from '../../domain/use-cases/interaction/update-interaction.use-case';
import { DeleteInteractionUseCase } from '../../domain/use-cases/interaction/delete-interaction.use-case';

export class InteractionController {
  constructor(
    private createInteractionUseCase: CreateInteractionUseCase,
    private listInteractionsUseCase: ListInteractionsUseCase,
    private listAllInteractionsUseCase: ListInteractionsUseCase,
    private getInteractionUseCase: GetInteractionUseCase,
    private updateInteractionUseCase: UpdateInteractionUseCase,
    private deleteInteractionUseCase: DeleteInteractionUseCase
  ) {}

  registerRoutes(app: Application): void {
    app.post('/interactions', async (req, res) => {
      try {
        console.log('Received POST /interactions with body:', req.body);
        const interaction = await this.createInteractionUseCase.execute(req.body);
        res.status(201).json(interaction);
      } catch (error: any) {
        console.error('Error in POST /interactions:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to create interaction', details: error.message });
      }
    });

    app.get('/interactions/:customerId', async (req, res) => {
      try {
        console.log('Received GET /interactions/:customerId with customerId:', req.params.customerId);
        const interactions = await this.listInteractionsUseCase.execute(req.params.customerId);
        res.json(interactions);
      } catch (error: any) {
        console.error('Error in GET /interactions/:customerId:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to list interactions', details: error.message });
      }
    });

    app.get('/interactions', async (req, res) => {
      try {
        console.log('Received GET /interactions with query:', req.query);
        const interactions = await this.listAllInteractionsUseCase.execute(req.query.customerId as string);
        res.json(interactions);
      } catch (error: any) {
        console.error('Error in GET /interactions:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to list all interactions', details: error.message });
      }
    });

    app.get('/interactions/id/:id', async (req, res) => {
      try {
        console.log('Received GET /interactions/id/:id with id:', req.params.id);
        const interaction = await this.getInteractionUseCase.execute(req.params.id);
        if (!interaction) return res.status(404).json({ error: 'Interaction not found' });
        res.json(interaction);
      } catch (error: any) {
        console.error('Error in GET /interactions/id/:id:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to get interaction', details: error.message });
      }
    });

    app.put('/interactions/:id', async (req, res) => {
      try {
        console.log('Received PUT /interactions/:id with id:', req.params.id, 'body:', req.body);
        const interaction = await this.updateInteractionUseCase.execute(req.params.id, req.body);
        if (!interaction) return res.status(404).json({ error: 'Interaction not found' });
        res.json(interaction);
      } catch (error: any) {
        console.error('Error in PUT /interactions/:id:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to update interaction', details: error.message });
      }
    });

    app.delete('/interactions/:id', async (req, res) => {
      try {
        console.log('Received DELETE /interactions/:id with id:', req.params.id);
        await this.deleteInteractionUseCase.execute(req.params.id);
        res.status(204).send();
      } catch (error: any) {
        console.error('Error in DELETE /interactions/:id:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to delete interaction', details: error.message });
      }
    });
  }
}