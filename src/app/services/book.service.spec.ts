import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { BookValidationService } from './book-validation.service';
import { Book } from '../models/book.model';
import { of } from 'rxjs';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let validationServiceSpy: jasmine.SpyObj<BookValidationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('BookValidationService', [
      'hasRequiredInfo',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BookService,
        { provide: BookValidationService, useValue: spy },
      ],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
    validationServiceSpy = TestBed.inject(
      BookValidationService
    ) as jasmine.SpyObj<BookValidationService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search books and return filtered results with imageLinks', () => {
    const dummyBooks = {
      items: [
        {
          id: '1',
          volumeInfo: {
            title: 'Test Book',
            authors: ['Author'],
            description: 'Test Desc',
            imageLinks: { thumbnail: 'test-thumbnail-url' },
          },
        },
      ],
      totalItems: 1,
    };

    validationServiceSpy.hasRequiredInfo.and.returnValue(true);

    service.searchBooks('test query').subscribe((res) => {
      expect(res.books.length).toBe(1);
      expect(res.books[0].id).toBe('1');
      expect(res.books[0].volumeInfo.imageLinks.thumbnail).toBe(
        'test-thumbnail-url'
      );
      expect(res.totalItems).toBe(1);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}?q=test%20query&orderBy=relevance&maxResults=24&startIndex=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooks);
  });

  it('should return an empty array when no books with imageLinks are found', () => {
    const dummyResponse = {
      items: [],
      totalItems: 0,
    };

    validationServiceSpy.hasRequiredInfo.and.returnValue(true);

    service.searchBooks('no results query').subscribe((res) => {
      expect(res.books.length).toBe(0);
      expect(res.totalItems).toBe(0);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}?q=no%20results%20query&orderBy=relevance&maxResults=24&startIndex=0`
    );
    req.flush(dummyResponse);
  });

  it('should handle errors on book search', () => {
    service.searchBooks('error query').subscribe({
      error: (error) => {
        expect(error.message).toContain(
          'Erro ao buscar livros da API do Google Books.'
        );
      },
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}?q=error%20query&orderBy=relevance&maxResults=24&startIndex=0`
    );
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should add book to favorites', () => {
    const book: Book = {
      id: '1',
      volumeInfo: {
        title: 'Test Book',
        authors: ['Author'],
        description: 'Test Desc',
        imageLinks: { thumbnail: 'test-thumbnail-url' },
      },
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([]));
    spyOn(localStorage, 'setItem');

    service.addToFavorites(book);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([book])
    );
  });

  it('should not add duplicate books to favorites', () => {
    const book: Book = {
      id: '1',
      volumeInfo: {
        title: 'Test Book',
        authors: ['Author'],
        description: 'Test Desc',
        imageLinks: { thumbnail: 'test-thumbnail-url' },
      },
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([book]));
    spyOn(localStorage, 'setItem');

    service.addToFavorites(book);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should remove book from favorites', () => {
    const bookId = '1';
    const existingFavorites = [{ id: '1' }, { id: '2' }];
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(existingFavorites)
    );
    spyOn(localStorage, 'setItem');

    service.removeFromFavorites(bookId);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([{ id: '2' }])
    );
  });
});
