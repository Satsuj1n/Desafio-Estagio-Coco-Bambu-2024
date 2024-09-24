export interface VolumeInfo {
  title: string;
  authors: string[];
  description: string;
  imageLinks: {
    thumbnail: string;
  };
}

export class Book {
  id: string;
  volumeInfo: VolumeInfo;
  tags?: string[];
  notes?: { title: string; description: string; page?: number }[];
  rating?: number;

  constructor(
    id: string,
    volumeInfo: VolumeInfo,
    tags?: string[],
    notes?: { title: string; description: string; page?: number }[],
    rating?: number
  ) {
    this.id = id;
    this.volumeInfo = volumeInfo;
    this.tags = tags || [];
    this.notes = notes || [];
    this.rating = rating || 0;
  }
}
