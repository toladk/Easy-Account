import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMandateComponent } from './manage-mandate.component';

describe('ManageMandateComponent', () => {
  let component: ManageMandateComponent;
  let fixture: ComponentFixture<ManageMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
