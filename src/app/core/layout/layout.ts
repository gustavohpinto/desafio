import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SchoolService } from '../services/school/school';
import { SchoolClassService } from '../services/school-class/school-class';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {
  public activeSection: string = 'dashboard';
  public menuOpen: boolean = false;

  private readonly _schoolsService = inject(SchoolService);
  private readonly _schoolClassService = inject(SchoolClassService);
  private readonly _router = inject(Router);

  ngOnInit() {
    this._schoolsService.getAll().subscribe((data) => {
      console.log('Schools:', data);
    });

    this._schoolClassService.getAll().subscribe((data) => {
      console.log('School Classes:', data);
    });
  }

  setActive(link: string) {
    this.activeSection = link;
    this._router.navigate([link]);
  }
}
