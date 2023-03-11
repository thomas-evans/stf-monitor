import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'titleCleanup'
})
export class TitleCleanupPipe implements PipeTransform {

  transform(value: string) {
    return value.replace('_', ' ');
  }
}
