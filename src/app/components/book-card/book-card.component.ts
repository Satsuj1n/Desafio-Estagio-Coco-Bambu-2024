import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../models/book.model';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  imports: [RatingModule, FormsModule, CommonModule],
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  @Output() favoriteRemoved = new EventEmitter<void>();
  value: number = 0;
  tags: string[] = [];
  isTagPopupVisible: boolean = false;
  newTag: string = '';

  constructor(private bookService: BookService) {}

  openTagPopup() {
    this.isTagPopupVisible = true;
  }

  closeTagPopup() {
    this.isTagPopupVisible = false;
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.saveTagsToLocalStorage();
  }

  saveTagsToLocalStorage() {
    localStorage.setItem(`tags_${this.book.id}`, JSON.stringify(this.tags));
  }

  saveRatingToLocalStorage() {
    localStorage.setItem(`${this.book.id}-rating`, JSON.stringify(this.value));
  }

  addTag() {
    const trimmedTag = this.newTag.trim();
    if (trimmedTag && !this.tags.includes(trimmedTag)) {
      this.tags.push(trimmedTag);
      this.saveTagsToLocalStorage();
      this.newTag = '';
    } else {
      console.log('Tag já existe ou é inválida.');
      this.newTag = '';
      this.closeTagPopup();
    }
  }

  ngOnInit() {
    const storedRates = localStorage.getItem(`${this.book.id}-rating`);
    this.value = storedRates ? JSON.parse(storedRates) : 0;
    const storedTags = localStorage.getItem(`tags_${this.book.id}`);
    this.tags = storedTags ? JSON.parse(storedTags) : [];
  }

  onRatingChange(newRating: number) {
    this.value = newRating;
    this.saveRatingToLocalStorage();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    const updatedFavorites = favorites.map((fav: any) => {
      if (fav.id === this.book.id) {
        fav.rating = newRating;
      }
      return fav;
    });

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  loadRating() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteBook = favorites.find((fav: any) => fav.id === this.book.id);
    if (favoriteBook && favoriteBook.rating) {
      this.value = favoriteBook.rating;
    }
  }

  removeFromFavorites() {
    this.bookService.removeFromFavorites(this.book.id);
    this.favoriteRemoved.emit();
  }

  addNote() {
    console.log(`Nota adicionada: ${this.value}`);
  }
}
