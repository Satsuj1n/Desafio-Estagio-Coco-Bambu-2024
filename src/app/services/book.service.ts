import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BookValidationService } from './book-validation.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(
    private http: HttpClient,
    private validationService: BookValidationService
  ) {}


  searchBooks(
    query: string = '',
    startIndex: number = 0
  ): Observable<{ books: Book[]; totalItems: number }> {
    let params = new HttpParams();

    // Se a query estiver vazia, usa 'books' como termo genérico
    const searchQuery = query.trim() === '' ? 'books' : query;

    // Configuração de parâmetros
    params = params.set('q', searchQuery); // Termo de pesquisa
    params = params.set(
      'orderBy',
      query.trim() === '' ? 'newest' : 'relevance'
    ); // Ordenação
    params = params.set('maxResults', '24'); // Resultados por página
    params = params.set('startIndex', startIndex.toString()); // Índice inicial para a paginação

    return this.http
      .get<{ items: any[]; totalItems: number }>(`${this.apiUrl}`, { params })
      .pipe(
        map((response) => {
          // Mapeia os livros e total de itens
          const books = response.items
            ? response.items
                .map((item) => ({
                  id: item.id,
                  volumeInfo: {
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors,
                    description: item.volumeInfo.description,
                    imageLinks: item.volumeInfo.imageLinks,
                  },
                }))
                .filter((book: Book) =>
                  this.validationService.hasRequiredInfo(book)
                ) 
            : [];

          return { books, totalItems: response.totalItems || 0 };
        }),
        catchError((error) => {
          console.error('Erro ao buscar livros: ', error);
          return throwError(
            () => new Error('Erro ao buscar livros da API do Google Books.')
          );
        })
      );
  }
}
