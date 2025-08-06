import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterStatus'
})
export class CharacterStatusPipe implements PipeTransform {

  transform(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive': return 'text-alive';
      case 'dead': return 'text-dead';
      case 'unknown': return 'text-unknown';
      default: return 'text-default';
    }
  }

}
