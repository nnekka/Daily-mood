import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../../../validators/custom.validator";
import {Legend} from "../../../../shared/interfaces";

@Component({
  selector: 'app-color-legend-form',
  templateUrl: './color-legend-form.component.html',
  styleUrls: ['./color-legend-form.component.scss']
})
export class ColorLegendFormComponent implements OnInit {

  legendsArray: Legend[] = [];
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      color: new FormControl(null, Validators.required),
      text: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    console.log(`#${this.form.value.color.hex}`);
  }

  addLegendToArray() {
    const src = `#${this.form.value.color.hex}`;
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
