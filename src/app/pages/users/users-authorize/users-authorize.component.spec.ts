import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAuthorizeComponent } from './users-authorize.component';

describe('UsersAuthorizeComponent', () => {
  let component: UsersAuthorizeComponent;
  let fixture: ComponentFixture<UsersAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAuthorizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
