import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolClassModal } from './school-class-modal';
import { FormsModule } from '@angular/forms';

describe('SchoolClassModal Component', () => {
  let component: SchoolClassModal;
  let fixture: ComponentFixture<SchoolClassModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SchoolClassModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolClassModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});
