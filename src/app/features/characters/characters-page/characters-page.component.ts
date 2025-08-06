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
  public showEditModal = false;
  public deleted = false;

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

  onCharacterUpdated(updatedCharacter: Character){
    this.character = { ...updatedCharacter };
  }

  onEdit(){
    this.showEditModal = true;
    console.log(this.showEditModal);
  }

  onDelete(){
    this.character = null as any;
    this.deleted = true;
    setTimeout(() => {
      this.router.navigate(['/characters/list']);
    }, 3000);
  }

  goBack():void{
    this.router.navigate(['/characters/list']);
  }
}
