import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent {
  @Input() favoriteCount: number = 0;

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit() {
    this.updateFavoriteCount();

    // Escuta a mudança nos favoritos e atualiza o contador
    this.bookService.favoriteCountChanged.subscribe(() => {
      this.updateFavoriteCount();
    });
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

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
}
