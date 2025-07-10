// import mongoose, { Schema } from 'mongoose';
// import { Interaction } from '../../../domain/entities/interaction.entity';

// const interactionSchema = new Schema({
//   customerId: { type: String, required: true },
//   content: { type: String, required: true },
//   summary: { type: String },
//   autoResponse: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// const InteractionModel = mongoose.model('Interaction', interactionSchema);

// export class InteractionMongoRepository implements InteractionMongoRepository {
//   async create(interaction: Interaction): Promise<Interaction> {
//     const created = await InteractionModel.create(interaction);
//     return created.toObject();
//   }

//   async findByCustomerId(customerId: string): Promise<Interaction[]> {
//     return InteractionModel.find({ customerId }).lean();
//   }
// }

import mongoose, { Schema } from 'mongoose';
import { Interaction } from '../../../domain/entities/interaction.entity';
import { InteractionRepository } from '../../../domain/ports/interaction.repository.port';

const interactionSchema = new Schema({
  customerId: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, default: null },
  autoResponse: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

const InteractionModel = mongoose.model('Interaction', interactionSchema);

export class InteractionMongoRepository implements InteractionRepository {
  async create(interaction: Interaction): Promise<Interaction> {
    const created = await InteractionModel.create(interaction);
    const result = created.toObject();
    return {
      id: result._id.toString(),
      customerId: result.customerId,
      content: result.content,
      summary: result.summary,
      autoResponse: result.autoResponse,
      createdAt: result.createdAt
    };
  }

  async findByCustomerId(customerId: string): Promise<Interaction[]> {
    const interactions = await InteractionModel.find({ customerId }).lean();
    return interactions.map((doc) => ({
      id: doc._id.toString(),
      customerId: doc.customerId,
      content: doc.content,
      summary: doc.summary,
      autoResponse: doc.autoResponse,
      createdAt: doc.createdAt
    }));
  }

  async findAll(): Promise<Interaction[]> {
    const interactions = await InteractionModel.find().lean();
    return interactions.map((doc) => ({
      id: doc._id.toString(),
      customerId: doc.customerId,
      content: doc.content,
      summary: doc.summary,
      autoResponse: doc.autoResponse,
      createdAt: doc.createdAt
    }));
  }

  async findById(id: string): Promise<Interaction | null> {
    const doc = await InteractionModel.findById(id).lean();
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      customerId: doc.customerId,
      content: doc.content,
      summary: doc.summary,
      autoResponse: doc.autoResponse,
      createdAt: doc.createdAt
    };
  }

  async update(id: string, interaction: Partial<Interaction>): Promise<Interaction | null> {
    const updated = await InteractionModel.findByIdAndUpdate(id, interaction, { new: true }).lean();
    if (!updated) return null;
    return {
      id: updated._id.toString(),
      customerId: updated.customerId,
      content: updated.content,
      summary: updated.summary,
      autoResponse: updated.autoResponse,
      createdAt: updated.createdAt
    };
  }

  async delete(id: string): Promise<void> {
    await InteractionModel.findByIdAndDelete(id);
  }
}