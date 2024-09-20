import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookValidationService {
  hasRequiredInfo(book: Book): boolean {
    return (
      !!book.volumeInfo.title && // Título é obrigatório
      !!book.volumeInfo.authors && // Autores são obrigatórios
      !!book.volumeInfo.description && // Descrição é obrigatória
      !!book.volumeInfo.imageLinks?.thumbnail // Verifica se a imagem está disponível
    );
  }
}
