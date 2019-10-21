import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from '../services/global.service';
import { User } from '../schema/user';
import { Questionnaire } from '../schema/questionnaire'
import { Question } from '../schema/question';
import { Option } from '../schema/option';
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  
  votes: Array<number>;
  currentOptions: Array<Option>;
  totalCredits: number;
  currentQuestionIndex: number;
  constructor(
    private gService: GlobalService, 
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    
    this.gService.questionSet.subscribe((data: Questionnaire)=>{
      this.currentQuestionIndex = data.currentQuestion;
      let currentQuestion = data.question_list[this.currentQuestionIndex];
      this.currentOptions = currentQuestion.options;
      this.votes=new Array(this.currentOptions.length).fill(0);
      this.totalCredits = currentQuestion.totalCredits;
      this.gService.votes.subscribe(votes => {
        this.votes = votes[this.currentQuestionIndex];
      })
    })
    let path = JSON.parse(this.cookieService.get('user_path'))[0];
    this.gService.getQuestionnaire(path);
  }
  calCurrentTotalCredits() {
    let totalCredit = 0;
    this.votes.forEach(vote => {
      totalCredit = totalCredit + vote*vote;
    });
    return totalCredit;
  }
  modifyVotesByID(o_index, value){
    let originalVote = this.gService.votesContent[
      this.currentQuestionIndex
    ][
      o_index
    ];
    this.gService.modifyVotesByID(this.currentQuestionIndex+1, o_index+1, originalVote+value);
  }
}
