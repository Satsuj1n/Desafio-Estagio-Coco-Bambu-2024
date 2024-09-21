import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card-simple',
  standalone: true,
  templateUrl: './book-card-simple.component.html',
  styleUrls: ['./book-card-simple.component.scss'],
})
export class BookCardSimpleComponent {
  @Input() book!: Book;
  @Output() favoriteAdded = new EventEmitter<void>();

  addToFavorites() {
    console.log(`Livro adicionado aos favoritos: ${this.book.volumeInfo.title}`);
    // Emitir evento para incrementar o contador de favoritos
    this.favoriteAdded.emit();
  }
}
