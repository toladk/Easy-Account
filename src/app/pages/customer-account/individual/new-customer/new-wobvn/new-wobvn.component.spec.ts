import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWobvnComponent } from './new-wobvn.component';

describe('NewWobvnComponent', () => {
  let component: NewWobvnComponent;
  let fixture: ComponentFixture<NewWobvnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWobvnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWobvnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
