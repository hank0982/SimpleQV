import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from '../services/global.service';
import { User } from '../schema/user';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private gService: GlobalService, 
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }
  initCookie(user){
    this.cookieService.set('user_current_question_index', String(0));
    this.cookieService.set('user_complete_flag', String(user.complete_flag));
    this.cookieService.set('user_path', JSON.stringify(user.path));
    this.cookieService.set('user_id', user.userid);
    this.cookieService.set('user_current_path_index', String(0));
  }
  createUser() {
    if(!this.cookieService.check('user_id')){
      this.gService.getUserID().subscribe((user: User) => {
        this.initCookie(user);
        this.router.navigate(['questionnaire']);
      })
    }else{
      this.router.navigate(['questionnaire']);
    }
    
  }
}
