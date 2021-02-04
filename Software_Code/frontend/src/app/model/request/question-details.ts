import {QuestionType} from '../enums/question-type.enum';

export class QuestionDetails {
  questionnaireId: number;
  title: string;
  type: QuestionType;
  description: string;
  question: string;
  required: boolean;
  answers: string[] = ['', ''];
  systemUsabilityScale: number;
}
