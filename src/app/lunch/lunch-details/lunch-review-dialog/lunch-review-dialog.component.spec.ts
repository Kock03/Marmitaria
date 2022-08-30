import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchReviewDialogComponent } from './lunch-review-dialog.component';

describe('LunchReviewDialogComponent', () => {
  let component: LunchReviewDialogComponent;
  let fixture: ComponentFixture<LunchReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchReviewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunchReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
