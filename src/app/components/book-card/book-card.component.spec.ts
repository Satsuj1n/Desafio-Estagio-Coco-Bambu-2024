import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardComponent } from './book-card.component';
import { By } from '@angular/platform-browser';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCardComponent, HttpClientTestingModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
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
    component.tags = ['Tag1', 'Tag2'];
    component.notes = [
      { title: 'Note 1', description: 'Description 1', page: 1 },
      { title: 'Note 2', description: 'Description 2' },
    ];
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

  it('should display and handle tags correctly', () => {
    component.tags = ['Tag1', 'Tag2'];
    fixture.detectChanges();

    const tagElements = fixture.debugElement.queryAll(By.css('.tag'));

    expect(tagElements.length).toBe(2);

    if (tagElements.length > 0) {
      spyOn(component, 'removeTag');
      const removeTagButton = tagElements[0].query(
        By.css('.a-remove p')
      )?.nativeElement;
      if (removeTagButton) {
        removeTagButton.click();
        expect(component.removeTag).toHaveBeenCalledWith(0);
      }
    }
  });

  it('should open the tag popup when the button is clicked', () => {
    spyOn(component, 'openTagPopup');

    const tagButton = fixture.debugElement.query(
      By.css('.middle-button')
    ).nativeElement;
    tagButton.click();

    expect(component.openTagPopup).toHaveBeenCalled();
  });

  it('should open the note popup when the button is clicked', () => {
    spyOn(component, 'addNotePopup');

    const noteButton = fixture.debugElement.query(
      By.css('.left-button')
    ).nativeElement;
    noteButton.click();

    expect(component.addNotePopup).toHaveBeenCalled();
  });
});
