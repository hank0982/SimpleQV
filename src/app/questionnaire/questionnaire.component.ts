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
  numFile: number = 1;
  currentFile: number = 1;
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
      let pathArray: Array<string> = JSON.parse(this.cookieService.get('user_path'));
      this.numFile = pathArray.length;
      let pathIndex = Number(this.cookieService.get('user_current_path_index'));
      this.currentFile = pathIndex + 1;
    })
    
    this.gService.getQuestionnaire();
  }

}
