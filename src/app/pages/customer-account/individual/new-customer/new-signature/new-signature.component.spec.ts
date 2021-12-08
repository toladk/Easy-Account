import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSignatureComponent } from './new-signature.component';

describe('NewSignatureComponent', () => {
  let component: NewSignatureComponent;
  let fixture: ComponentFixture<NewSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
