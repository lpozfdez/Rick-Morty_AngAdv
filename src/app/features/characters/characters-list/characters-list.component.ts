import { Component } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Character } from '../models/Character.model';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  public characters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading = true;

  constructor( private charactersService: CharactersService ){}

  ngOnInit(): void {
    this.loadCharacters(this.currentPage);
  }

  loadCharacters(page: number): void {
    this.isLoading = true;
    this.charactersService.getCharacters(page).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.characters = response.results;
          this.totalPages = response.info.pages;
          this.currentPage = page;
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.isLoading = false;
        }, 300);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadCharacters(page);
    }
  }
}
