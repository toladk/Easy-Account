import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpExistingCustomerComponent } from './corp-existing-customer.component';

describe('CorpExistingCustomerComponent', () => {
  let component: CorpExistingCustomerComponent;
  let fixture: ComponentFixture<CorpExistingCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpExistingCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpExistingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
