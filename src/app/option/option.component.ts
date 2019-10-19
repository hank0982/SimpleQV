import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  options=[
    {
      o_id: 0,
      option: "Option 1",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as the",
    },
    {
      o_id: 1,
      option: "Option 2",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as the",
    },
    {
      o_id: 2,
      option: "Option 1",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as the",
    },
  ]
  votes=new Array(this.options.length).fill(0);
  constructor() {
  }

  ngOnInit() {
  }
  modifyVotesByID(id, value){
    this.votes[id]=this.votes[id]+value;
    console.log(this.votes);
  }
}
