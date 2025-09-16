import { Component, inject, OnInit } from '@angular/core';
import { School } from '../../core/models/school';
import { SchoolService } from '../../core/services/school/school';
import { SchoolModal } from './components/school-modal/school-modal';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schools',
  imports: [SchoolModal, FormsModule, AsyncPipe],
  templateUrl: './schools.html',
  styleUrl: './schools.scss',
})
export class Schools {
  public searchTerm = '';
  public selectedSchool: School | null = null;
  public isModalOpen = false;
  public isEdit = false;

  private readonly _schoolService = inject(SchoolService);
  private readonly _router = inject(Router);

  public schools$ = this._schoolService.getAll();

  openSchoolModal(school?: School): void {
    this.isModalOpen = true;
    this.isEdit = !!school;
    this.selectedSchool = school ? { ...school } : this.getEmptySchool();
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
      classesCount: 0,
    };
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedSchool = null;
  }

  saveSchool(school: School): void {
    if (this.isEdit && school.id) {
      this._schoolService.update(school.id, school).subscribe();
    } else {
      this._schoolService.create(school).subscribe();
    }
    this.closeModal();
  }

  deleteSchool(id: number): void {
    if (confirm('Deseja realmente excluir esta escola?')) {
      this._schoolService.delete(id).subscribe();
    }
  }

  filteredSchools(schools: School[]): School[] {
    const term = this.searchTerm.toLowerCase();
    return schools.filter((s) => s.name.toLowerCase().includes(term));
  }

  goToSchoolClass(schoolId: number): void {
    this._router.navigate(['/turmas'], { queryParams: { schoolId } });
  }
}
