import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardComponent } from './book-card.component';
import { Book } from '../../models/book.model';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  const mockBook: Book = {
    id: '1',
    volumeInfo: {
      title: 'Angular for Beginners',
      authors: ['John Doe'],
      description: 'A comprehensive guide to Angular.',
      imageLinks: {
        thumbnail: 'http://example.com/thumbnail.jpg',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.book = mockBook;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display book title and authors', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Angular for Beginners'
    );
    expect(compiled.querySelector('p')?.textContent).toContain('John Doe');
  });

  it('should call addToFavorites when button is clicked', () => {
    spyOn(component, 'addToFavorites');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.addToFavorites).toHaveBeenCalled();
  });
});
