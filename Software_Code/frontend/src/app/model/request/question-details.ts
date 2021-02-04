import {QuestionType} from '../enums/question-type.enum';

export class QuestionDetails {
  questionnaireId: number;
  title: string;
  type: QuestionType;
  description: string;
  question: string; //question is title
  required: boolean;
  answers: string[]; // should it be an array of answers?
  systemUsabilityScale: number;
}
