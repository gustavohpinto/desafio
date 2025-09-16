import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SchoolService } from '../../core/services/school/school';
import { SchoolClassService } from '../../core/services/school-class/school-class';

import { School } from '../../core/models/school';
import { Classes } from '../../core/models/school-classes';

import { SchoolModal } from '../schools/components/school-modal/school-modal';
import { SchoolClassModal } from '../school-class/components/school-class-modal/school-class-modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SchoolModal, SchoolClassModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly schoolService = inject(SchoolService);
  private readonly classService = inject(SchoolClassService);
  private readonly router = inject(Router);

  schools: School[] = [];
  classes: Classes[] = [];

  totalSchools = 0;
  totalClasses = 0;
  totalStudents = 0;

  isSchoolModalOpen = false;
  isClassModalOpen = false;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // escolas
    this.schoolService.getAll().subscribe({
      next: (schools) => {
        this.schools = schools || [];
        this.totalSchools = this.schools.length;
        this.totalStudents = this.schools.reduce(
          (sum, s) => sum + (s.students || 0),
          0
        );
      },
      error: (err) => {
        console.error('[Dashboard] erro ao carregar escolas:', err);
        this.schools = [];
        this.totalSchools = 0;
        this.totalStudents = 0;
      },
    });

    // turmas
    this.classService.getAll().subscribe({
      next: (classes) => {
        this.classes = classes || [];
        this.totalClasses = this.classes.length;
      },
      error: (err) => {
        console.error('[Dashboard] erro ao carregar turmas:', err);
        this.classes = [];
        this.totalClasses = 0;
      },
    });
  }

  goToTurmas(schoolId: number): void {
    this.router.navigate(['/turmas'], { queryParams: { schoolId } });
  }

  openSchoolModal(): void {
    this.isSchoolModalOpen = true;
  }
  openClassModal(): void {
    this.isClassModalOpen = true;
  }
  closeSchoolModal(): void {
    this.isSchoolModalOpen = false;
    this.loadData();
  }
  closeClassModal(): void {
    this.isClassModalOpen = false;
    this.loadData();
  }

  get recentSchools(): School[] {
    return [...this.schools].slice(-3).reverse();
  }
}
