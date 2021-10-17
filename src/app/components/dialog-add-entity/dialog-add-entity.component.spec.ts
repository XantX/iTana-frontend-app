import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEntityComponent } from './dialog-add-entity.component';

describe('DialogAddEntityComponent', () => {
  let component: DialogAddEntityComponent;
  let fixture: ComponentFixture<DialogAddEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
