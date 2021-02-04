import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionScaleComponent } from './question-scale.component';

describe('QuestionScaleComponent', () => {
  let component: QuestionScaleComponent;
  let fixture: ComponentFixture<QuestionScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
