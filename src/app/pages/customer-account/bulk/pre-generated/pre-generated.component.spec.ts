import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreGeneratedComponent } from './pre-generated.component';

describe('PreGeneratedComponent', () => {
  let component: PreGeneratedComponent;
  let fixture: ComponentFixture<PreGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreGeneratedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
