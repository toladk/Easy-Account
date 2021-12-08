import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeIndividualComponent } from './authorize-individual.component';

describe('AuthorizeIndividualComponent', () => {
  let component: AuthorizeIndividualComponent;
  let fixture: ComponentFixture<AuthorizeIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
