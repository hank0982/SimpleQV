import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  dynamic=0;
  usedVotes=0;
  totalVotes=100;
  constructor() { }

  ngOnInit() {
  }

}
