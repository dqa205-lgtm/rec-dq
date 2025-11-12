
export interface Place {
  id: string;
  name: string;
  tags: string[];
  summary: string;
}

export interface Answer {
  text: string;
  nextStepId: string; // Can be a question ID or a place ID
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
}