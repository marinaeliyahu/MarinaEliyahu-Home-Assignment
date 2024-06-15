import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDialogFormComponent } from './popup-dialog-form.component';

describe('PopupDialogFormComponent', () => {
  let component: PopupDialogFormComponent;
  let fixture: ComponentFixture<PopupDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDialogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
