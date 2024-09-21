import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-card-simple',
  standalone: true,
  templateUrl: './book-card-simple.component.html',
  styleUrls: ['./book-card-simple.component.scss'],
})
export class BookCardSimpleComponent {
  @Input() book!: Book;
  @Output() favoriteAdded = new EventEmitter<void>();

  constructor(private bookService: BookService) {}

  addToFavorites() {
    this.bookService.addToFavorites(this.book);
    this.favoriteAdded.emit();
  }
}
