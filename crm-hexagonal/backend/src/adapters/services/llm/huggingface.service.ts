// import axios from 'axios';
// import { environment } from '../../../infrastructure/config/environment';
// import { LLMServicePort } from '../../../domain/ports/llm.service.port';

// export class HuggingFaceService implements LLMServicePort {
//   private readonly apiUrl = 'https://api-inference.huggingface.co/models/mixtral-8x7b-instruct-v0.1';
//   private readonly headers = {
//     Authorization: `Bearer ${environment.huggingFaceApiKey}`,
//   };

//   async chat(prompt: string): Promise<string> {
//     const response = await axios.post(this.apiUrl, { inputs: `Chat: ${prompt}` }, { headers: this.headers });
//     return response.data[0].generated_text;
//   }

//   async summarize(text: string): Promise<string> {
//     const response = await axios.post(this.apiUrl, { inputs: `Summarize: ${text}` }, { headers: this.headers });
//     return response.data[0].generated_text;
//   }

//   async generateResponse(text: string): Promise<string> {
//     const response = await axios.post(this.apiUrl, { inputs: `Generate response: ${text}` }, { headers: this.headers });
//     return response.data[0].generated_text;
//   }
// }

import axios from 'axios';
import { environment } from '../../../infrastructure/config/environment';
import { LLMServicePort } from '../../../domain/ports/llm.service.port';

export class HuggingFaceService implements LLMServicePort {
  chat(prompt: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://api-inference.huggingface.co/models/mixtral-8x7b-instruct-v0.1';

  async summarize(text: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        { inputs: `Summarize: ${text}` },
        { headers: { Authorization: `Bearer ${environment.huggingFaceApiKey}` } }
      );
      return response.data[0]?.generated_text || 'Summary not generated';
    } catch (error) {
      console.error('Hugging Face summarize error:', error);
      return 'Error generating summary';
    }
  }

  async generateResponse(text: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        { inputs: `Generate a professional response for: ${text}` },
        { headers: { Authorization: `Bearer ${environment.huggingFaceApiKey}` } }
      );
      return response.data[0]?.generated_text || 'Response not generated';
    } catch (error) {
      console.error('Hugging Face response error:', error);
      return 'Error generating response';
    }
  }
}