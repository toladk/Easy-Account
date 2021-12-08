import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBvnComponent } from './new-bvn.component';

describe('NewBvnComponent', () => {
  let component: NewBvnComponent;
  let fixture: ComponentFixture<NewBvnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBvnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBvnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
