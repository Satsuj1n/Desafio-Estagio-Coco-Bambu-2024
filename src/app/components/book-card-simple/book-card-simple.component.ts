import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card-simple',
  standalone: true,
  templateUrl: './book-card-simple.component.html',
  styleUrls: ['./book-card-simple.component.scss'],
})
export class BookCardSimpleComponent {
  @Input() book!: Book;

  addToFavorites() {
    console.log('Adicionado aos Favoritos:', this.book);
    // Lógica para adicionar aos favoritos aqui
  }
}
