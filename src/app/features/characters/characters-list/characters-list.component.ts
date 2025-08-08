import { Component } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Character } from '../models/Character.model';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {

  characters: Character[] = [];
  totalCharacters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage = 12;
  pages: number[] = [];
  isLoading = true;
  isFiltered = false;

  constructor( private charactersService: CharactersService ){}

  ngOnInit(): void {
    this.loadCharacters(this.currentPage);
  }

  loadCharacters(page: number): void {
    this.isLoading = true;
    this.charactersService.getCharacters(page).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.totalCharacters = response.results;
          this.characters = this.totalCharacters;
          this.totalPages = response.info.pages;
          this.currentPage = page;
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.isLoading = false;
          this.isFiltered = false;
        }, 300);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  filterChar( results: any ) {
    if( results === 'clean' ){
      this.isFiltered = false;
      this.loadCharacters(this.currentPage);
    }else{
      this.characters = results;
      this.isFiltered = true;
      this.pages = [];
    }
  }

  goToPage(page: number): void {
    if (!this.isFiltered && page >= 1 && page <= this.totalPages) {
      this.loadCharacters(page);
    }
  }
}
