import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.model';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  imports: [RatingModule, FormsModule],
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() favoriteRemoved = new EventEmitter<void>();
  value: number = 0;

  constructor(private bookService: BookService) {}

  removeFromFavorites() {
    this.bookService.removeFromFavorites(this.book.id);
    this.favoriteRemoved.emit();
  }

  addNote() {
    console.log(`Nota adicionada: ${this.value}`);
  }
  addTag() {
    console.log(`Tags adicionadas: ${this.value}`);
  }
}
