import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookValidationService {
  // Verifica se o livro tem as informações obrigatórias
  hasRequiredInfo(book: Book): boolean {
    return (
      !!book.volumeInfo.title &&
      !!book.volumeInfo.authors &&
      !!book.volumeInfo.description &&
      !!book.volumeInfo.imageLinks?.thumbnail
    );
  }
}
