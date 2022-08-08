import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchDetailsDialogComponent } from './lunch-details-dialog.component';

describe('LunchDetailsDialogComponent', () => {
  let component: LunchDetailsDialogComponent;
  let fixture: ComponentFixture<LunchDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunchDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
