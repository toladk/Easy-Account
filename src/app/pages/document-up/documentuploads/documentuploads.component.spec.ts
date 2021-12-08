import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentuploadsComponent } from './documentuploads.component';

describe('DocumentuploadsComponent', () => {
  let component: DocumentuploadsComponent;
  let fixture: ComponentFixture<DocumentuploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentuploadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
