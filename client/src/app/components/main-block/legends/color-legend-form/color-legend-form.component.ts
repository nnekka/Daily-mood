import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../../../validators/custom.validator";
import {Calendar, Legend} from "../../../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-color-legend-form',
  templateUrl: './color-legend-form.component.html',
  styleUrls: ['./color-legend-form.component.scss']
})
export class ColorLegendFormComponent implements OnInit {

  legendsArray: Legend[] = [];
  form: FormGroup;
  calendar: Calendar;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.data.subscribe(
      (data) => {
        this.calendar = data.calendar;
      }
    )
  }

  private initForm() {
    this.form = new FormGroup({
      src: new FormControl(null, Validators.required),
      text: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    console.log(`#${this.form.value.src.hex}`);
  }

  addLegendToArray() {
    const src = `#${this.form.value.src.hex}`;
    const text = this.form.value.text;
    const existLegend = this.legendsArray.find(p => p.src === src || p.text === text);
    if (!existLegend){
      this.legendsArray.push({ src, text })
    } else {
      console.log(existLegend)
    }

  }

  onDeleteLegend(i: number) {
    this.legendsArray.splice(i, 1);
  }
}
