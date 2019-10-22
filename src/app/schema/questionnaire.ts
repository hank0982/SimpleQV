import { Question } from './question';
export interface Questionnaire {
    question_list: Array<Question>;
    reset: boolean,
    currentQuestion: number,
} 