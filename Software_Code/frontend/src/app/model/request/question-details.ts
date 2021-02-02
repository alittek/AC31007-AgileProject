export class QuestionDetails {
  questionnaireID: number;
  title: string;
  description: string;
  required: boolean;
  type: number;
  question: string; // is it needed?
  answers: string[]; // for multiple-choice
}
