export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  interactions: Interaction[];
}

export interface Interaction {
  date: Date;
  content: string;
  summary?: string;
  autoResponse?: string;
}