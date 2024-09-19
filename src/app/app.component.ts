import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Para navegação
import { NavBarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngFor e *ngIf
import { Book } from './models/book.model';
import { BookService } from './services/book.service';

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
  ], // Importe os componentes standalone
})
export class AppComponent implements OnInit {
  books: Book[] = []; // Array para armazenar os livros
  errorMessage: string | null = null; // Variável para armazenar erros

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Faz a busca inicial ao carregar a página
    this.bookService.searchBooks().subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        this.errorMessage = error.message; // Exibe a mensagem de erro se algo der errado
      }
    );
  }

  onSearch(query: string) {
    // Faz a busca com o termo inserido pelo usuário
    this.bookService.searchBooks(query).subscribe(
      (books) => {
        this.books = books;
        this.errorMessage = null; // Limpa a mensagem de erro se a busca for bem-sucedida
      },
      (error) => {
        this.errorMessage = error.message; // Exibe a mensagem de erro se algo der errado
      }
    );
  }
}
