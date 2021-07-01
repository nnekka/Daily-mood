import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CalendarService} from "../../../../shared/services/calendar.service";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {Subscription} from "rxjs/internal/Subscription";
import {MaterialService} from "../../../../shared/material.service";



@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  unSub: Subscription

  types = [
    {
      text: 'цветная',
      type: 'color'
    },
    {
      text: 'с картинками',
      type: 'image'
    }
  ];

  constructor(
    private calendarService: CalendarService,
    private material: MaterialService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.validateTitle();
  }

  ngOnDestroy(): void {
    if (this.unSub){
      this.unSub.unsubscribe();
    }
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      year: new FormControl(2021, Validators.required),
      legendType: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    console.log(this.form.value)
  }

  onChangeRadio(type: string) {
    this.form.patchValue({
      legendType: type
    })
  }

  //попытка в асинхронную валидацию :)
  private validateTitle() {
    this.form.valueChanges
      .pipe(
        //.takeUntil(this.ngUnsubscribe)        // отписка после разрушения
        map(form => form['title']),
        distinctUntilChanged(),                 // брать измененные данные
        debounceTime(300),              // отсрочим
        switchMap(() => {return this.calendarService.fetchTitles()})
      )
      .subscribe(titles => {
        if (titles.includes(this.form.get('title').value)){
          this.material.showMessage(`${this.form.get('title').value} is already taken`)
          this.form.get('title').setErrors({none: true})
        }
      });
  }

}
