import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardSimpleComponent } from './book-card-simple.component';
import { By } from '@angular/platform-browser';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('BookCardSimpleComponent', () => {
  let component: BookCardSimpleComponent;
  let fixture: ComponentFixture<BookCardSimpleComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCardSimpleComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardSimpleComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    component.book = {
      id: '1',
      volumeInfo: {
        title: 'Test Book',
        authors: ['Author 1', 'Author 2'],
        description:
          'This is a test book description that is long enough to check truncation.',
        imageLinks: { thumbnail: 'test-thumbnail-url' },
      },
    };
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the book title, authors, and thumbnail', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    const authorsElement = fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    const imageElement = fixture.debugElement.query(
      By.css('img')
    ).nativeElement;

    expect(titleElement.textContent).toContain('Test Book');
    expect(authorsElement.textContent).toContain('Author 1, Author 2');
    expect(imageElement.src).toContain('test-thumbnail-url');
  });

  it('should emit an event when the add to favorites button is clicked', () => {
    spyOn(component, 'addToFavorites');

    const buttonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    buttonElement.click();

    expect(component.addToFavorites).toHaveBeenCalled();
  });
});
