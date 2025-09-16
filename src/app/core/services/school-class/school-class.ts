import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Classes } from '../../models/school-classes';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {
  private apiUrl = 'http://localhost:3000/classes';

  private readonly _http = inject(HttpClient);

  private classesSubject = new BehaviorSubject<Classes[]>([]);
  classes$ = this.classesSubject.asObservable();

  constructor() {
    this.loadAll(); // carrega na inicialização
  }

  private loadAll() {
    this._http.get<Classes[]>(this.apiUrl).subscribe(data => {
      this.classesSubject.next(data);
    });
  }

  getAll(): Observable<Classes[]> {
    return this.classes$;
  }

  getById(id: number): Observable<Classes> {
    return this._http.get<Classes>(`${this.apiUrl}/${id}`);
  }

  create(cls: Classes): Observable<Classes> {
    return this._http.post<Classes>(this.apiUrl, cls).pipe(
      tap(() => this.loadAll())
    );
  }

  update(id: number, cls: Classes): Observable<Classes> {
    return this._http.put<Classes>(`${this.apiUrl}/${id}`, cls).pipe(
      tap(() => this.loadAll())
    );
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadAll())
    );
  }
}
