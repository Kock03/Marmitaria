import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchListDialogComponent } from './lunch-list-dialog.component';

describe('LunchListDialogComponent', () => {
  let component: LunchListDialogComponent;
  let fixture: ComponentFixture<LunchListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunchListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
