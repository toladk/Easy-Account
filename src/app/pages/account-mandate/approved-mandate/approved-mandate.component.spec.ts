import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedMandateComponent } from './approved-mandate.component';

describe('ApprovedMandateComponent', () => {
  let component: ApprovedMandateComponent;
  let fixture: ComponentFixture<ApprovedMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
