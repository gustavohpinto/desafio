import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { School } from '../../models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private readonly _http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/schools';

  private schoolsSubject = new BehaviorSubject<School[]>([]);
  schools$ = this.schoolsSubject.asObservable();

  constructor() {
    this.loadAll();
  }

  private loadAll() {
    this._http.get<School[]>(this.apiUrl).subscribe({
      next: (data) => this.schoolsSubject.next(data)
    });
  }

  getAll(): Observable<School[]> {
    return this.schools$;
  }

  create(school: School): Observable<School> {
    return this._http.post<School>(this.apiUrl, school).pipe(
      tap(() => this.loadAll()) // recarrega automaticamente
    );
  }

  update(id: number, school: School): Observable<School> {
    return this._http.put<School>(`${this.apiUrl}/${id}`, school).pipe(
      tap(() => this.loadAll())
    );
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadAll())
    );
  }
}
