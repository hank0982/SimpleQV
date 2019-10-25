import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from '../schema/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Questionnaire } from '../schema/questionnaire';
import { CookieService } from 'ngx-cookie-service';
import { submitPostSchema } from '../schema/submitPostSchema';
import { Router } from '@angular/router';

function calTotalCredits(votesArray) {
  let q_totalUsedCredits = 0;
  votesArray.forEach(vote => {
    q_totalUsedCredits = q_totalUsedCredits + Math.pow(vote, 2);
  });
  return q_totalUsedCredits;
}

function getCurrentQuestion(){
  
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  requestUrl = 'http://localhost:5000';
  @Output() questionSet: EventEmitter<object> = new EventEmitter();
  @Output() votes: EventEmitter<Array<Array<number>>> = new EventEmitter();
  @Output() usedCredits: EventEmitter<Array<number>> = new EventEmitter();
  votesContent: Array<Array<number>>;
  usedCreditsArray: Array<number>;
  questionnaire: Questionnaire;
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService,
    private router: Router,
  ) { }
  getUserID() {
    return this.http.post<User>(`${this.requestUrl}/createUser`, null)
    .pipe(
      catchError(this.handleError)
    );
  }
  getCookieById(id: string) {
    return this.cookieService.get(id);
  }
  getCurrentPath() {
    let pathIndex = Number(this.getCookieById('user_current_path_index'));
    let pathArray: Array<string> = JSON.parse(this.getCookieById('user_path'));
    return pathArray[pathIndex];
  }
  generateSubmitPost(completeFlag: boolean) {
    let submitPost: submitPostSchema = {} as submitPostSchema;
    submitPost.complete_flag = completeFlag;
    submitPost.file_name = this.getCurrentPath();
    let currentQuestion = this.getCookieById('user_current_question_index');
    submitPost.qid = this.questionnaire.question_list[currentQuestion].qid;
    submitPost.results = this.votesContent[this.getCookieById('user_current_question_index')];
    submitPost.user_id = this.getCookieById('user_id');
    return submitPost;
  }
  update() {
    this.usedCredits.emit(this.usedCreditsArray);
    this.votes.emit(this.votesContent);
  }
  modifyVotesByID(q_id, o_id, value) {
    this.votesContent[q_id-1][o_id-1] = value;
    this.usedCreditsArray[q_id-1] = calTotalCredits(this.votesContent[q_id-1]);    ;
    this.update();
  }
  getQuestionnaire() {
    let path = this.getCurrentPath();
    const result = this.http.get(`${this.requestUrl}/qv/${path}`)
    .pipe(
      catchError(this.handleError)
    ) 
    let currentQuestion = this.getCookieById('user_current_question_index');
    result.subscribe((data: Questionnaire) => {
      let height = data.question_list.length;
      let votesArray = [];
      for(let i = 0; i < height; i++){
        votesArray.push(new Array(data.question_list[i].options.length).fill(0));
      }
      this.votesContent = votesArray;
      this.usedCreditsArray = new Array(height).fill(0);
      this.update();
      this.questionSet.emit({currentQuestion: Number(currentQuestion), ...data});
      this.questionnaire = data;
    });
    return;
  }
  submit() {
    let nextQuestionIndex: number = Number(this.getCookieById('user_current_question_index')) + 1;
    let submitData: submitPostSchema = this.generateSubmitPost(false);
    if (nextQuestionIndex >= this.questionnaire.question_list.length) {
      nextQuestionIndex = 0;
      let pathIndex = Number(this.getCookieById('user_current_path_index'));
      let pathArray: Array<string> = JSON.parse(this.getCookieById('user_path'));
      this.cookieService.set('user_current_path_index', String(pathIndex+1));
      if (pathIndex+1 >= pathArray.length) {
        this.cookieService.deleteAll();
        submitData.complete_flag = true;
        return this.http.post(`${this.requestUrl}/submit`, submitData).pipe(
          catchError(this.handleError)
        ).subscribe(data => {
          console.log(data)
          this.router.navigate(['end']);
        });
      }
    }
    this.cookieService.set('user_current_question_index', String(nextQuestionIndex));
    this.getQuestionnaire();
    submitData = this.generateSubmitPost(false);
    return this.http.post(`${this.requestUrl}/submit`, submitData).pipe(
      catchError(this.handleError)
    ).subscribe(data => {
      console.log(data)
    });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
