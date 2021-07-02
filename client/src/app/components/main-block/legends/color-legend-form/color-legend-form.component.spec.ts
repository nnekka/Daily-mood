import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorLegendFormComponent } from './color-legend-form.component';

describe('ColorLegendFormComponent', () => {
  let component: ColorLegendFormComponent;
  let fixture: ComponentFixture<ColorLegendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorLegendFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorLegendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
