import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../user-http.service'
import * as moment from 'moment';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  errors: any[];
  quizzes: any[];
  quizSelect
  date
  time = {hour: 13, minute: 0}; 
  minDate
  maxDate
  minuteStep = 30

  constructor(
    private _httpService: UserHttpService,
  ) { }

  ngOnInit() {
    this._httpService.getUserQuizzes(localStorage.getItem('userId'))
      .subscribe(data => {
        if (data['message'] === 'error') {
          for (let err in data['error']) {
            this.errors.push(err)
          }
        }
        else {
          this.quizzes = data['data'] 
          let today = moment()
          let sevenDaysFromToday = moment().add(7, 'days')
          this.minDate = {year: Number(today.format('YYYY')), month: Number(today.format("M")), day: Number(today.format("D"))};
          this.maxDate = {year: Number(sevenDaysFromToday.format('YYYY')), month: Number(sevenDaysFromToday.format("M")), day: Number(sevenDaysFromToday.format("D"))};
        }
      })
  }



}
