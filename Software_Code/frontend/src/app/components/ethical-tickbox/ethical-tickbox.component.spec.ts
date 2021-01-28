import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthicalTickboxComponent } from './ethical-tickbox.component';

describe('EthicalTickboxComponent', () => {
  let component: EthicalTickboxComponent;
  let fixture: ComponentFixture<EthicalTickboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthicalTickboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthicalTickboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
