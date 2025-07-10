export interface Interaction {
  id?: string;
  customerId: string;
  content: string;
  timestamp: Date;
  summary?: string | null;
  autoResponse?: string | null;
}
