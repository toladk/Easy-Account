import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserauditComponent } from './useraudit.component';

describe('UserauditComponent', () => {
  let component: UserauditComponent;
  let fixture: ComponentFixture<UserauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserauditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
