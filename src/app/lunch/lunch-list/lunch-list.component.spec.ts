import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchListComponent } from './lunch-list.component';

describe('LunchListComponent', () => {
  let component: LunchListComponent;
  let fixture: ComponentFixture<LunchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
