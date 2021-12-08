import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreatecifAccountComponent } from './new-createcif-account.component';

describe('NewCreatecifAccountComponent', () => {
  let component: NewCreatecifAccountComponent;
  let fixture: ComponentFixture<NewCreatecifAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCreatecifAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCreatecifAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
