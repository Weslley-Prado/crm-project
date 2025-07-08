export interface LlmServicePort {
  generateSummary(text: string): Promise<string>;
  generateResponse(text: string): Promise<string>;
  chat(message: string): Promise<string>;
}