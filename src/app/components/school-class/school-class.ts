import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { SchoolService } from '../../core/services/school/school';
import { Classes } from '../../core/models/school-classes';
import { School } from '../../core/models/school';
import { SchoolClassService } from '../../core/services/school-class/school-class';
import { SchoolClassModal } from './components/school-class-modal/school-class-modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-class',
  standalone: true,
  imports: [FormsModule, AsyncPipe, SchoolClassModal],
  templateUrl: './school-class.html',
  styleUrl: './school-class.scss',
})
export class SchoolClass {
  schools: School[] = [];

  searchTerm = '';
  selectedSchoolId: number | null = null;

  isModalOpen = false;
  isEdit = false;
  selectedClass: Classes | null = null;
  localClass: Classes = this.getEmptyClass();

  private readonly _classService = inject(SchoolClassService);
  private readonly _schoolService = inject(SchoolService);
  private readonly _route = inject(ActivatedRoute);

  public classes$ = this._classService.classes$;
  public schools$ = this._schoolService.getAll();

  constructor() {
    this.schools$.subscribe((s) => (this.schools = s));

    this._route.queryParams.subscribe((params) => {
      const schoolId = params['schoolId'];
      if (schoolId) {
        this.selectedSchoolId = +schoolId;
      }
    });
  }

  openClassModal(cls?: Classes) {
    this.isModalOpen = true;
    this.isEdit = !!cls;

    if (cls) {
      this.selectedClass = { ...cls };
      this.localClass = { ...cls };

      // garante que o schoolId seja number
      this.localClass.schoolId = +cls.schoolId;
    } else {
      this.selectedClass = null;
      this.localClass = this.getEmptyClass();
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedClass = null;
  }

  saveClass(cls: Classes) {
    if (this.isEdit && this.selectedClass) {
      this._classService.update(cls.id, cls).subscribe();
    } else {
      this._classService.create(cls).subscribe();
    }
    this.closeModal();
  }

  deleteClass(id: number) {
    if (confirm('Deseja excluir esta turma?')) {
      this._classService.delete(id).subscribe();
    }
  }

  filteredClasses(list: Classes[]): Classes[] {
    const term = this.searchTerm.trim().toLowerCase();
    return list.filter((c) => {
      const matchText =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.teacher.toLowerCase().includes(term) ||
        c.room.toLowerCase().includes(term);
      const matchSchool =
        !this.selectedSchoolId || +c.schoolId === +this.selectedSchoolId;
      return matchText && matchSchool;
    });
  }

  groupBySchool(
    list: Classes[]
  ): { schoolId: number; schoolName: string; classes: Classes[] }[] {
    const byId = new Map<number, Classes[]>();

    for (const c of list) {
      const id = +c.schoolId;
      const arr = byId.get(id) ?? [];
      arr.push(c);
      byId.set(id, arr);
    }

    const result: {
      schoolId: number;
      schoolName: string;
      classes: Classes[];
    }[] = [];
    for (const [schoolId, classes] of byId) {
      const schoolName =
        this.schools.find((s) => +s.id === +schoolId)?.name ||
        classes[0]?.schoolName ||
        'Escola';

      result.push({ schoolId, schoolName, classes });
    }

    result.sort((a, b) => a.schoolName.localeCompare(b.schoolName));
    return result;
  }

  private getEmptyClass(): Classes {
    return {
      id: 0,
      name: '',
      grade: '',
      year: '',
      teacher: '',
      room: '',
      schedule: '',
      students: 0,
      schoolId: 0,
    };
  }
}
