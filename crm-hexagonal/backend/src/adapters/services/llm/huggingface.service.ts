// import axios from 'axios';
// import { environment } from '../../../infrastructure/config/environment';
// import { LLMServicePort } from '../../../domain/ports/llm.service.port';

// export class HuggingFaceService implements LLMServicePort {
//   private readonly apiUrl = 'https://router.huggingface.co/together/v1/chat/completions';
//   private readonly apiKey = environment.huggingFaceApiKey;
//   private readonly model = 'mistralai/Mixtral-8x7B-Instruct-v0.1';

//   async chat(prompt: string): Promise<string> {
//     try {
//       const response = await axios.post(
//         this.apiUrl,
//         {
//           model: this.model,
//           messages: [{ role: 'user', content: prompt }]
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${this.apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       console.log('Chat response:', JSON.stringify(response.data, null, 2));
//       return response.data.choices?.[0]?.message?.content || 'No response generated';
//     } catch (error: any) {
//       console.error('Error in HuggingFaceService.chat:', error.message, error.response?.data);
//       return 'Chat response unavailable';
//     }
//   }

//   async summarize(text: string): Promise<string> {
//     try {
//       const response = await axios.post(
//         this.apiUrl,
//         {
//           model: this.model,
//           messages: [{ role: 'user', content: `Summarize: ${text}` }]
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${this.apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       console.log('Summarize response:', JSON.stringify(response.data, null, 2));
//       return response.data.choices?.[0]?.message?.content || 'Summary unavailable';
//     } catch (error: any) {
//       console.error('Error in HuggingFaceService.summarize:', error.message, error.response?.data);
//       return 'Summary unavailable';
//     }
//   }

//   async generateResponse(text: string): Promise<string> {
//     try {
//       const response = await axios.post(
//         this.apiUrl,
//         {
//           model: this.model,
//           messages: [{ role: 'user', content: `Generate a response to: ${text}` }]
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${this.apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       console.log('GenerateResponse response:', JSON.stringify(response.data, null, 2));
//       return response.data.choices?.[0]?.message?.content || 'Response unavailable';
//     } catch (error: any) {
//       console.error('Error in HuggingFaceService.generateResponse:', error.message, error.response?.data);
//       return 'Response unavailable';
//     }
//   }
// }
import axios from 'axios';
import { environment } from '../../../infrastructure/config/environment';
import { LLMServicePort } from '../../../domain/ports/llm.service.port';

export class HuggingFaceService implements LLMServicePort {
  private readonly apiUrl = 'https://router.huggingface.co/together/v1/chat/completions';
  private readonly apiKey = environment.huggingFaceApiKey;
  private readonly model = 'mistralai/Mixtral-8x7B-Instruct-v0.1';

  async chat(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [{ role: 'user', content: prompt }]
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Chat response:', JSON.stringify(response.data, null, 2));
      return response.data.choices?.[0]?.message?.content || 'No response generated';
    } catch (error: any) {
      console.error('Error in HuggingFaceService.chat:', error.message, error.response?.data);
      return 'Chat response unavailable';
    }
  }

  async summarize(text: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [{ role: 'user', content: `Summarize: ${text}` }]
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Summarize response:', JSON.stringify(response.data, null, 2));
      return response.data.choices?.[0]?.message?.content || 'Summary unavailable';
    } catch (error: any) {
      console.error('Error in HuggingFaceService.summarize:', error.message, error.response?.data);
      return 'Summary unavailable';
    }
  }

  async generateResponse(text: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [{ role: 'user', content: `Generate a response to: ${text}` }]
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('GenerateResponse response:', JSON.stringify(response.data, null, 2));
      return response.data.choices?.[0]?.message?.content || 'Response unavailable';
    } catch (error: any) {
      console.error('Error in HuggingFaceService.generateResponse:', error.message, error.response?.data);
      return 'Response unavailable';
    }
  }
}