import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Questionnaire } from '../schema/questionnaire';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  usedCredits: number;
  totalCredits: number;
  percentage: number;
  type: string;
  constructor(
    private gService: GlobalService,
  ) { }
  submit() {
    this.gService.submit();
  }
  ngOnInit() {
    this.gService.questionSet.subscribe((data: Questionnaire) =>{
      this.totalCredits = data.question_list[data.currentQuestion].totalCredits;
      this.gService.usedCredits.subscribe(usedCredits=>{
        this.usedCredits = usedCredits[data.currentQuestion];
        let percentage = (this.usedCredits/this.totalCredits)*100;
        if (percentage < 25) {
          this.type = 'success';
        } else if (percentage < 50) {
          this.type = 'info';
        } else if (percentage < 75) {
          this.type = 'warning';
        } else {
          this.type = 'danger';
        }
        this.percentage = percentage;
      })
    })
    
  }

}
