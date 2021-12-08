import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailInquiryComponent } from './account-detail-inquiry.component';

describe('AccountDetailInquiryComponent', () => {
  let component: AccountDetailInquiryComponent;
  let fixture: ComponentFixture<AccountDetailInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDetailInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
