import { Question } from './question';
export interface Questionnaire {
    question_list: Array<Question>;
    qid: number,
    reset: boolean,
    currentQuestion: number,
} 