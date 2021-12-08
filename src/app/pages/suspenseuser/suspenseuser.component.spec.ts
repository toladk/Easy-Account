import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseuserComponent } from './suspenseuser.component';

describe('SuspenseuserComponent', () => {
  let component: SuspenseuserComponent;
  let fixture: ComponentFixture<SuspenseuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenseuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
