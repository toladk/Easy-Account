import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateNewComponent } from './corporate-new.component';

describe('CorporateNewComponent', () => {
  let component: CorporateNewComponent;
  let fixture: ComponentFixture<CorporateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
