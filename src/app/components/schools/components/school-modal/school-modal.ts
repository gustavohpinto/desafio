import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { School } from '../../../../core/models/school';

@Component({
  selector: 'school-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './school-modal.html',
  styleUrls: ['./school-modal.scss']
})
export class SchoolModal {
  @Input() isEdit = false;
  @Input() school: School | null = null;
  @Output() onSave = new EventEmitter<School>();
  @Output() onClose = new EventEmitter<void>();

  localSchool: School = this.getEmptySchool();

  ngOnInit() {
    this.localSchool = this.school ? { ...this.school } : this.getEmptySchool();
  }

  save() {
    this.onSave.emit(this.localSchool);
  }

  close() {
    this.onClose.emit();
  }

  private getEmptySchool(): School {
    return {
      id: 0,
      name: '',
      director: '',
      address: '',
      phone: '',
      email: '',
      students: 0,
      classesCount: 0
    };
  }
}
