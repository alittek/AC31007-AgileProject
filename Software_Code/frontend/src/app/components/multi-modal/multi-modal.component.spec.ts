import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiModalComponent } from './multi-modal.component';

describe('MultiModalComponent', () => {
  let component: MultiModalComponent;
  let fixture: ComponentFixture<MultiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
