import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMinorComponent } from './new-minor.component';

describe('NewMinorComponent', () => {
  let component: NewMinorComponent;
  let fixture: ComponentFixture<NewMinorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMinorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMinorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
