import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpNewCustomerComponent } from './corp-new-customer.component';

describe('CorpNewCustomerComponent', () => {
  let component: CorpNewCustomerComponent;
  let fixture: ComponentFixture<CorpNewCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpNewCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpNewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
