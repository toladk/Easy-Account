import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateaccountformComponent } from './generateaccountform.component';

describe('GenerateaccountformComponent', () => {
  let component: GenerateaccountformComponent;
  let fixture: ComponentFixture<GenerateaccountformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateaccountformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateaccountformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
