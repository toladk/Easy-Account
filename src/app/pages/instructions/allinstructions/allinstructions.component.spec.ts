import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllinstructionsComponent } from './allinstructions.component';

describe('AllinstructionsComponent', () => {
  let component: AllinstructionsComponent;
  let fixture: ComponentFixture<AllinstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllinstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllinstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
