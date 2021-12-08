import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingbulkComponent } from './pendingbulk.component';

describe('PendingbulkComponent', () => {
  let component: PendingbulkComponent;
  let fixture: ComponentFixture<PendingbulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingbulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
