import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLegendFormComponent } from './image-legend-form.component';

describe('ImageLegendFormComponent', () => {
  let component: ImageLegendFormComponent;
  let fixture: ComponentFixture<ImageLegendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageLegendFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLegendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
