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
  @Output() tagsUpdated = new EventEmitter<void>();
  @Output() notesUpdated = new EventEmitter<void>();
  @Output() ratingUpdated = new EventEmitter<void>();
  value: number = 0;
  tags: string[] = [];
  notes: { title: string; description: string; page?: number }[] = [];
  isTagPopupVisible: boolean = false;
  isNotePopupVisible: boolean = false;
  newTag: string = '';
  newNoteTitle: string = '';
  newNoteDescription: string = '';
  newNotePage?: number;
  isEditingNote = false;
  noteIndexToEdit: number | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    const storedNotes = localStorage.getItem(`${this.book.id}-notes`);
    this.notes = storedNotes ? JSON.parse(storedNotes) : [];
    const storedRates = localStorage.getItem(`${this.book.id}-rating`);
    this.value = storedRates ? JSON.parse(storedRates) : 0;
    const storedTags = localStorage.getItem(`tags_${this.book.id}`);
    this.tags = storedTags ? JSON.parse(storedTags) : [];
  }

  openTagPopup() {
    this.isTagPopupVisible = true;
  }

  closeTagPopup() {
    this.isTagPopupVisible = false;
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.saveTagsToLocalStorage();
    this.tagsUpdated.emit();
  }
  saveNotesToLocalStorage() {
    localStorage.setItem(`${this.book.id}-notes`, JSON.stringify(this.notes));
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
      this.closeTagPopup();
      this.tagsUpdated.emit();
    } else {
      console.log('Tag já existe ou é inválida.');
      this.newTag = '';
      this.closeTagPopup();
    }
  }

  onRatingChange(newRating: number) {
    this.value = newRating;
    this.saveRatingToLocalStorage();
    this.ratingUpdated.emit();
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

  addNotePopup() {
    this.isNotePopupVisible = true;
  }

  closeNotePopup() {
    this.isNotePopupVisible = false;
    this.isEditingNote = false;
    this.newNoteTitle = '';
    this.newNoteDescription = '';
    this.newNotePage = undefined;
  }

  editNote(index: number) {
    this.isEditingNote = true;
    this.noteIndexToEdit = index;

    const note = this.notes[index];
    this.newNoteTitle = note.title;
    this.newNoteDescription = note.description;
    this.newNotePage = note.page || undefined;

    this.isNotePopupVisible = true;

    setTimeout(() => {
      const noteSection = document.querySelector('.add-note-section');
      if (noteSection) {
        noteSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  addNoteToBook() {
    const newNote = {
      title: this.newNoteTitle,
      description: this.newNoteDescription,
      page: this.newNotePage || undefined,
    };

    if (this.isEditingNote && this.noteIndexToEdit !== null) {
      this.notes[this.noteIndexToEdit] = newNote;
      this.isEditingNote = false;
      this.noteIndexToEdit = null;
    } else {
      this.notes.push(newNote);
    }

    this.saveNotesToLocalStorage();
    this.notesUpdated.emit();

    this.newNoteTitle = '';
    this.newNoteDescription = '';
    this.newNotePage = undefined;
  }

  removeNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotesToLocalStorage();
    this.notesUpdated.emit();
  }

  loadNotes() {
    const savedNotes = localStorage.getItem(`${this.book.id}-notes`);
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }
}
