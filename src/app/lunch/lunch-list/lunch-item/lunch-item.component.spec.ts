import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchItemComponent } from './lunch-item.component';

describe('LunchItemComponent', () => {
  let component: LunchItemComponent;
  let fixture: ComponentFixture<LunchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
