import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';  // URL base para a API de volumes

  constructor(private http: HttpClient) {}

  // Função para buscar livros com base na query ou buscar os mais recentes com paginação
  searchBooks(query: string = '', startIndex: number = 0): Observable<Book[]> {
    let params = new HttpParams();

    // Se a query estiver vazia, usa 'books' como termo genérico
    const searchQuery = query.trim() === '' ? 'books' : query;

    // Configuração de parâmetros
    params = params.set('q', searchQuery);  // Termo de pesquisa
    params = params.set('orderBy', query.trim() === '' ? 'newest' : 'relevance');  // Ordenação
    params = params.set('maxResults', '24');  // Resultados por página
    params = params.set('startIndex', startIndex.toString());  // Índice inicial para a paginação

    return this.http.get<{ items: any[] }>(`${this.apiUrl}`, { params }).pipe(
      map((response) => {
        if (!response.items) return [];
        return response.items.map((item) => ({
          id: item.id,
          volumeInfo: {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            description: item.volumeInfo.description,
            imageLinks: item.volumeInfo.imageLinks,
          }
        }));
      }),
      catchError((error) => {
        console.error('Erro ao buscar livros: ', error);
        return throwError(() => new Error('Erro ao buscar livros da API do Google Books.'));
      })
    );
  }
}
