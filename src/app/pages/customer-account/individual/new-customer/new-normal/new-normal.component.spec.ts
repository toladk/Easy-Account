import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNormalComponent } from './new-normal.component';

describe('NewNormalComponent', () => {
  let component: NewNormalComponent;
  let fixture: ComponentFixture<NewNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNormalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
