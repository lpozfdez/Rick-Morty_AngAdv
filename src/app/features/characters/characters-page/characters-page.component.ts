import { Component } from '@angular/core';
import { Character } from '../models/Character.model';
import { CharactersService } from '../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss']
})
export class CharactersPageComponent {

  public character!: Character;

  constructor( private serv: CharactersService, private activatedRoute: ActivatedRoute, private router: Router ){}


  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.serv.getCharacterById(id) ),
    ).subscribe( character => {

      if(!character) return this.router.navigate(['/character/list']);

      this.character = character;
      console.log({character});

      return;

    })
  }

  goBack():void{
    this.router.navigateByUrl('character/list');
  }
}
