import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SchoolClassService } from './school-class';
import { Classes } from '../../models/school-classes';

describe('SchoolClassService', () => {
  let service: SchoolClassService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SchoolClassService],
    });
    service = TestBed.inject(SchoolClassService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('deve buscar todas as turmas', () => {
    const mock: Classes[] = [{ id: 1, name: 'Turma 101', grade: '1º ano', year: '2024', teacher: 'Prof. A', room: '101', schedule: 'Manhã', students: 25, schoolId: 1 }];

    service.getAll().subscribe(data => {
      expect(data).toEqual(mock);
    });

    const req = http.expectOne('http://localhost:3000/classes');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('deve criar uma turma', () => {
    const newClass: Classes = { id: 2, name: 'Turma 202', grade: '2º ano', year: '2024', teacher: 'Prof. B', room: '202', schedule: 'Tarde', students: 30, schoolId: 2 };

    service.create(newClass).subscribe(data => {
      expect(data).toEqual(newClass);
    });

    const req = http.expectOne('http://localhost:3000/classes');
    expect(req.request.method).toBe('POST');
    req.flush(newClass);
  });
});
