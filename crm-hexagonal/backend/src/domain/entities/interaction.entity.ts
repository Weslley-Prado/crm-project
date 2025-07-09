// export interface Interaction {
//   id?: string;
//   customerId: string;
//   content: string;
//   timestamp: Date;
//   summary?: string | null;
//   autoResponse?: string | null;
// }
export interface Interaction {
  id?: string;
  customerId: string;
  content: string;
  summary?: string | null;
  autoResponse?: string | null;
  createdAt?: Date;
}