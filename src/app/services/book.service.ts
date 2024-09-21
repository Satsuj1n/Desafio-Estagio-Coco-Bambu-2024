import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BookValidationService } from './book-validation.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes'; // URL base para a API de volumes
  private favoritesKey = 'favorites';
  favoriteCountChanged = new Subject<void>();

  constructor(
    private http: HttpClient,
    private validationService: BookValidationService
  ) {}

  // Função para buscar livros com base na query ou buscar os mais recentes com paginação
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

  // Funções de favoritos
  getFavoriteBooks(): any[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    }
    return [];
  }

  addToFavorites(book: Book) {
    let favorites = this.getFavoriteBooks();
    if (!favorites.find((fav) => fav.id === book.id)) {
      favorites.push(book);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.favoriteCountChanged.next(); // Emite o evento
    }
  }

  removeFromFavorites(bookId: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updatedFavorites = favorites.filter(
        (fav: any) => fav.id !== bookId
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  }
}
