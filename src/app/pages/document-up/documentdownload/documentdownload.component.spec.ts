import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentdownloadComponent } from './documentdownload.component';

describe('DocumentdownloadComponent', () => {
  let component: DocumentdownloadComponent;
  let fixture: ComponentFixture<DocumentdownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentdownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
