import { Option } from './option';
export interface Question {
    description: string,
    options: Array<Option>,
    totalCredits: number,
    question: string,
    qid: number,
}