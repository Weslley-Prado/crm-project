import axios from 'axios';
import { LlmServicePort } from '../../domain/ports/llm.service.port';

export class HuggingFaceAdapter implements LlmServicePort {
  private apiKey: string;
  private baseUrl = 'https://api-inference.huggingface.co/models/mixtral-8x7b-instruct-v0.1';

  constructor() {
    this.apiKey = process.env.HUGGINGFACE_API_KEY || '';
  }

  async generateSummary(text: string): Promise<string> {
    const response = await axios.post(
      this.baseUrl,
      { inputs: `Summarize: ${text}` },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data[0].generated_text;
  }

  async generateResponse(text: string): Promise<string> {
    const response = await axios.post(
      this.baseUrl,
      { inputs: `Generate a professional response: ${text}` },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data[0].generated_text;
  }

  async chat(message: string): Promise<string> {
    const response = await axios.post(
      this.baseUrl,
      { inputs: message },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data[0].generated_text;
  }
}