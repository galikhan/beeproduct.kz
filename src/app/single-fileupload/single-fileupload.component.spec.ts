import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFileuploadComponent } from './single-fileupload.component';

describe('SingleFileuploadComponent', () => {
  let component: SingleFileuploadComponent;
  let fixture: ComponentFixture<SingleFileuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFileuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
