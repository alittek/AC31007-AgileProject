import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultiComponent } from './question-multi.component';

describe('QuestionMultiComponent', () => {
  let component: QuestionMultiComponent;
  let fixture: ComponentFixture<QuestionMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
