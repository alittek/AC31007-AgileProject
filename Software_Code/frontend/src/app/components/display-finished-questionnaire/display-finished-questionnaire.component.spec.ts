import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFinishedQuestionnaireComponent } from './display-finished-questionnaire.component';

describe('DisplayFinishedQuestionnaireComponent', () => {
  let component: DisplayFinishedQuestionnaireComponent;
  let fixture: ComponentFixture<DisplayFinishedQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayFinishedQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFinishedQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
