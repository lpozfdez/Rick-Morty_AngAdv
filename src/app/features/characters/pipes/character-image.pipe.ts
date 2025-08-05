import { Pipe, type PipeTransform } from '@angular/core';
import { Character } from '../models/Character.model';

@Pipe({
  name: 'characterImage',
  standalone: false,
})
export class CharacterImagePipe implements PipeTransform {

  transform(character: Character): string {

    if(!character.id && !character.image){
      return 'assets/no-image.png';
    }

    if( character.image ) return character.image;

    return `assets/character/${character.id}.jpg`;

  }

}
