import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  imports: [RatingModule, FormsModule],
})
export class BookCardComponent {
  @Input() book!: Book;
  value: number = 0;

  addToFavorites() {
    console.log(`Adicionado aos favoritos: ${this.book.volumeInfo.title}`);
  }

  addNote() {
    console.log(`Nota adicionada: ${this.value}`);
  }
  addTag() {
    console.log(`Tags adicionadas: ${this.value}`);
  }
}
