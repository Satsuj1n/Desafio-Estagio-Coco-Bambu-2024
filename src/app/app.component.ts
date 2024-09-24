import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'; // Para navegação
import { NavBarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngFor e *ngIf
import { Book } from './models/book.model';
import { BookService } from './services/book.service';
import { BookCardSimpleComponent } from './components/book-card-simple/book-card-simple.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true, // Definido como standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    CommonModule,
    NavBarComponent,
    SearchBarComponent,
    BookCardComponent,
    BookCardSimpleComponent,
  ], // Importe os componentes standalone
})
export class AppComponent implements OnInit {
  books: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  booksPerPage: number = 24;
  searchQuery: string = '';
  visiblePages: number[] = [];
  maxVisiblePages: number = 3; // Número máximo de páginas visíveis
  favoriteCount: number = 0;
  isHomeRoute: boolean = false;

  Math = Math; // Expondo o objeto Math para o template

  private routerSubscription!: Subscription;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.updateFavoriteCount();
    this.loadBooks();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = this.router.url === '/';
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onFavoriteAdded() {
    this.updateFavoriteCount();
    this.bookService.getFavoriteBooks(); // Atualiza a lista de favoritos
  }

  updateFavoriteCount() {
    if (typeof window !== 'undefined') {
      // Verifica se o window está disponível
      const favoriteBooks = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );
      this.favoriteCount = favoriteBooks.length;
    } else {
      this.favoriteCount = 0; // Caso window ou localStorage não estejam disponíveis
    }
  }

  loadBooks() {
    const startIndex = (this.currentPage - 1) * this.booksPerPage;
    this.bookService
      .searchBooks(this.searchQuery, startIndex)
      .subscribe((response) => {
        this.books = response.books;
        this.totalItems = response.totalItems;
        this.updateVisiblePages();
        this.scrollToTop(); // Rolagem para o topo após carregar os livros
      });
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.loadBooks();
  }

  paginate(page: number) {
    this.currentPage = page;
    this.loadBooks();
  }

  updateVisiblePages() {
    const totalPages = Math.ceil(this.totalItems / this.booksPerPage);
    this.visiblePages = [];

    let startPage = this.currentPage - Math.floor(this.maxVisiblePages / 2);
    if (startPage < 1) {
      startPage = 1;
    }

    let endPage = startPage + this.maxVisiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage =
        endPage - this.maxVisiblePages + 1 > 0
          ? endPage - this.maxVisiblePages + 1
          : 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.booksPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
