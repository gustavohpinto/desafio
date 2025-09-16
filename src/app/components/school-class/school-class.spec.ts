import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClass } from './school-class';

describe('SchoolClass', () => {
  let component: SchoolClass;
  let fixture: ComponentFixture<SchoolClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
