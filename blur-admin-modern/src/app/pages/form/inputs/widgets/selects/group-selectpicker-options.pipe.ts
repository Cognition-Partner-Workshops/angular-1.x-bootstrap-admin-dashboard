import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupSelectpickerOptions', standalone: true, pure: true })
export class GroupSelectpickerOptionsPipe implements PipeTransform {
  transform<T>(items: T, props: Record<string, string>): T {
    if (!Array.isArray(items)) return items;
    const keys = Object.keys(props);
    return items.filter((item: any) => keys.some((key) => String(item[key]).toLowerCase().includes(String(props[key]).toLowerCase()))) as T;
  }
}
