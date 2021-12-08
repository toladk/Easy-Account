import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBulkComponent } from './new-bulk.component';

describe('NewBulkComponent', () => {
  let component: NewBulkComponent;
  let fixture: ComponentFixture<NewBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
