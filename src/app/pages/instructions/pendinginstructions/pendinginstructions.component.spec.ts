import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendinginstructionsComponent } from './pendinginstructions.component';

describe('PendinginstructionsComponent', () => {
  let component: PendinginstructionsComponent;
  let fixture: ComponentFixture<PendinginstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendinginstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendinginstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
