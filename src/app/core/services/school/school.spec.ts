import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SchoolService } from './school';
import { School } from '../../models/school';

describe('SchoolService', () => {
  let service: SchoolService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SchoolService],
    });
    service = TestBed.inject(SchoolService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve buscar todas as escolas', () => {
    const mockSchools: School[] = [
      { id: 1, name: 'Escola A', director: '', address: '', phone: '', email: '', students: 100, classesCount: 5 },
    ];

    service.getAll().subscribe((schools) => {
      expect(schools).toEqual(mockSchools);
    });

    const req = httpMock.expectOne('http://localhost:3000/schools');
    expect(req.request.method).toBe('GET');
    req.flush(mockSchools);
  });

  it('deve criar uma escola', () => {
    const newSchool: School = { id: 2, name: 'Escola B', director: '', address: '', phone: '', email: '', students: 50, classesCount: 2 };

    service.create(newSchool).subscribe((school) => {
      expect(school).toEqual(newSchool);
    });

    const req = httpMock.expectOne('http://localhost:3000/schools');
    expect(req.request.method).toBe('POST');
    req.flush(newSchool);
  });
});
