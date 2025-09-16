import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Classes } from '../../../../core/models/school-classes';
import { FormsModule } from '@angular/forms';
import { School } from '../../../../core/models/school';
import { SchoolService } from '../../../../core/services/school/school';

@Component({
  selector: 'school-class-modal',
  imports: [FormsModule],
  templateUrl: './school-class-modal.html',
  styleUrl: './school-class-modal.scss'
})
export class SchoolClassModal implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() isEdit = false;
  @Input() classData: Classes | null = null;
  @Output() onSave = new EventEmitter<Classes>();
  @Output() onClose = new EventEmitter<void>();

  public localClass: Classes = {} as Classes;

  public schools: School[] = [] ;

  private readonly _schoolService = inject(SchoolService);

  ngOnInit() {
    this._schoolService.getAll().subscribe(s => this.schools = s);
  }

  ngOnChanges() {
    if (this.classData) {
      this.localClass = { ...this.classData }; // faz cópia
    } else {
      this.localClass = {} as Classes;
    }
  }

  save() {
    this.onSave.emit(this.localClass);
    this.close();
  }

  close() {
    this.onClose.emit();
  }
}
