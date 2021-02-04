import {QuestionType} from '../enums/question-type.enum';

export class QuestionDetails {
  questionnaireID: number;
  title: string;
  type: QuestionType;
  description: string;
  question: string; //question is title
  required: boolean;
  answer: string[]; // should it be an array of answers?
  systemUsabilityScale: number;
}
