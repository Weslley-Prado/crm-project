export interface LLMServicePort {
  chat(prompt: string): Promise<string>;
  summarize(text: string): Promise<string>;
  generateResponse(text: string): Promise<string>;
}