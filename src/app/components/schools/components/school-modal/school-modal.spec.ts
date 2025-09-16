import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolModal } from './school-modal';
import { FormsModule } from '@angular/forms';

describe('SchoolModal Component', () => {
  let component: SchoolModal;
  let fixture: ComponentFixture<SchoolModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SchoolModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});
