import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMandateComponent } from './add-mandate.component';

describe('AddMandateComponent', () => {
  let component: AddMandateComponent;
  let fixture: ComponentFixture<AddMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
