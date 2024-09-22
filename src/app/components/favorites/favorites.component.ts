import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { NavBarComponent } from '../navbar/navbar.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [RouterOutlet, CommonModule, NavBarComponent, BookCardComponent],
})
export class FavoritesComponent implements OnInit {
  favoriteBooks: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.favoriteBooks = this.bookService.getFavoriteBooks();
  }

  loadFavoriteBooks(): void {
    this.favoriteBooks = this.bookService.getFavoriteBooks();
  }

  onFavoriteRemoved(book: Book) {
    this.favoriteBooks = this.favoriteBooks.filter(
      (favorite) => favorite.id !== book.id
    );
  }
}
