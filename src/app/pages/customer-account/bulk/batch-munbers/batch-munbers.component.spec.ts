import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMunbersComponent } from './batch-munbers.component';

describe('BatchMunbersComponent', () => {
  let component: BatchMunbersComponent;
  let fixture: ComponentFixture<BatchMunbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchMunbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchMunbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
