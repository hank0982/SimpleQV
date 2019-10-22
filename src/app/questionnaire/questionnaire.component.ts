import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from '../services/global.service';
import { User } from '../schema/user';
import { Questionnaire } from '../schema/questionnaire'
import { Question } from '../schema/question';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  questionnaire: Questionnaire;
  currentQuestion: number = 0;
  numQuestion: number = 1;
  questionTitle: string;
  questionDes: string;
  constructor(
    private gService: GlobalService, 
    private cookieService: CookieService
  ) { }


  ngOnInit() {
    this.gService.questionSet.subscribe((data: Questionnaire)=>{
      this.questionnaire = data;
      this.currentQuestion = data.currentQuestion;
      this.numQuestion = data.question_list.length;
      let questionContent = data.question_list[this.currentQuestion];
      this.questionDes = questionContent.description;
      this.questionTitle = questionContent.question;
      console.log(questionContent);
    })
    this.gService.getQuestionnaire();
  }

}
