import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDemandeCreditComponent } from './ajout-demande-credit.component';

describe('AjoutDemandeCreditComponent', () => {
  let component: AjoutDemandeCreditComponent;
  let fixture: ComponentFixture<AjoutDemandeCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutDemandeCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutDemandeCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
