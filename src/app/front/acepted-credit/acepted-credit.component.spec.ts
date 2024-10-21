import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptedCreditComponent } from './acepted-credit.component';

describe('AceptedCreditComponent', () => {
  let component: AceptedCreditComponent;
  let fixture: ComponentFixture<AceptedCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptedCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptedCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
