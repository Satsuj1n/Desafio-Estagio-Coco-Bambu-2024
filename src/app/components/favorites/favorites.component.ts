import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { NavBarComponent } from '../navbar/navbar.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Book } from '../../models/book.model';
import { FavoritesFilterComponent } from '../favorites-filter/favorites-filter.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [
    RouterOutlet,
    CommonModule,
    NavBarComponent,
    BookCardComponent,
    FavoritesFilterComponent,
  ],
})
export class FavoritesComponent implements OnInit {
  favoriteBooks: Book[] = [];
  filteredBooks: Book[] = [];
  searchQuery: string = '';
  selectedFilter: string = 'bestRated';
  isLoading: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadFavoriteBooks();
    this.applyFilter();
  }

  loadFavoriteBooks(): void {
    this.isLoading = true;
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          this.favoriteBooks = JSON.parse(savedFavorites);
          this.favoriteBooks.forEach((book) => {
            const storedTags = localStorage.getItem(`tags_${book.id}`);
            const storedNotes = localStorage.getItem(`${book.id}-notes`);
            const storedRating = localStorage.getItem(`${book.id}-rating`);

            book.tags = storedTags ? JSON.parse(storedTags) : [];
            book.notes = storedNotes ? JSON.parse(storedNotes) : [];
            book.rating = storedRating ? JSON.parse(storedRating) : 0;
          });

          this.filteredBooks = [...this.favoriteBooks];
        }
      }
      this.isLoading = false;
      this.applyFilter();
    }, 100);
  }

  onFavoriteRemoved(book: Book) {
    this.favoriteBooks = this.favoriteBooks.filter(
      (favorite) => favorite.id !== book.id
    );
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('favorites', JSON.stringify(this.favoriteBooks));
    }
    this.applyFilter();
  }

  applyFilter() {
    let books = [...this.favoriteBooks];

    if (this.searchQuery.trim()) {
      books = books.filter((book) => {
        const hasMatchingTag = book.tags?.some((tag) =>
          tag.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        const hasMatchingNote = book.notes?.some((note) =>
          note.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        const hasMatchingTitle = book.volumeInfo.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

        return hasMatchingTag || hasMatchingNote || hasMatchingTitle;
      });
    }

    if (this.selectedFilter) {
      if (this.selectedFilter === 'mostTags') {
        books = books.sort(
          (a, b) => (b.tags?.length || 0) - (a.tags?.length || 0)
        );
      } else if (this.selectedFilter === 'bestRated') {
        books = books.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (this.selectedFilter === 'mostNotes') {
        books = books.sort(
          (a, b) => (b.notes?.length || 0) - (a.notes?.length || 0)
        );
      }
    }

    this.filteredBooks = books;
    this.updateDOM();
  }

  updateDOM() {
    // Funcao para atualizar o DOM
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.applyFilter();
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  onBookUpdated() {
    this.loadFavoriteBooks();
    this.applyFilter();
  }
}
