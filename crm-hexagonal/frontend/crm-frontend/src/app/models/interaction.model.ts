export interface Interaction {
  [x: string]: any;
  id?: string;
  customerId: string;
  content: string;
  timestamp: Date;
  summary?: string | null;
  autoResponse?: string | null;
}
