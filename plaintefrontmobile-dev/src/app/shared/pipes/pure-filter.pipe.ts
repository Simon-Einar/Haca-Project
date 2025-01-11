import { Pipe, PipeTransform } from '@angular/core'
import { FilterPipe } from './filter.pipe'

@Pipe({ name: 'pureFilter' })
export class PureFilterPipe extends FilterPipe implements PipeTransform {
  transform(input: any[], filter: any, field?: string): any {
    return super.transform(input, filter, field)
  }
}
