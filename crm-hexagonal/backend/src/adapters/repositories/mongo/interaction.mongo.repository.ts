// import mongoose from 'mongoose';
// import { InteractionRepositoryPort } from '../../../domain/ports/interaction.repository.port';
// import { Interaction } from '../../../domain/entities/interaction.entity';

// const interactionSchema = new mongoose.Schema({
//   customerId: { type: String, required: true },
//   content: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
//   summary: String,
//   autoResponse: String,
// });

// const InteractionModel = mongoose.model('Interaction', interactionSchema);

// export class InteractionMongoRepository implements InteractionRepositoryPort {
//   async create(interaction: Interaction): Promise<Interaction> {
//     const newInteraction = new InteractionModel(interaction);
//     const saved = await newInteraction.save();
//     return { id: saved._id.toString(), ...interaction };
//   }

//   async findByCustomerId(customerId: string): Promise<Interaction[]> {
//     const interactions = await InteractionModel.find({ customerId }).exec();
//     return interactions.map(i => ({
//       id: i._id.toString(),
//       customerId: i.customerId,
//       content: i.content,
//       timestamp: i.timestamp,
//       summary: i.summary,
//       autoResponse: i.autoResponse,
//     }));
//   }
// }

import mongoose, { Schema } from 'mongoose';
import { Interaction } from '../../../domain/entities/interaction.entity';

const interactionSchema = new Schema({
  customerId: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String },
  autoResponse: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const InteractionModel = mongoose.model('Interaction', interactionSchema);

export class InteractionMongoRepository implements InteractionMongoRepository {
  async create(interaction: Interaction): Promise<Interaction> {
    const created = await InteractionModel.create(interaction);
    return created.toObject();
  }

  async findByCustomerId(customerId: string): Promise<Interaction[]> {
    return InteractionModel.find({ customerId }).lean();
  }
}