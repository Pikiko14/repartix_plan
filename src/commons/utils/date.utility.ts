import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DateUtility {
  getDate(): string {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  isDateBefore(date1: string, date2: string): boolean {
    return moment(date1, 'YYYY-MM-DD HH:mm:ss').isBefore(
      moment(date2, 'YYYY-MM-DD HH:mm:ss'),
    );
  }

  isDateAfter(date1: string, date2: string): boolean {
    return moment(date1, 'YYYY-MM-DD HH:mm:ss').isAfter(
      moment(date2, 'YYYY-MM-DD HH:mm:ss'),
    );
  }

  addDate(date: string, amount: number, unit: 'days' | 'years'): string {
    return moment(date, 'YYYY-MM-DD HH:mm:ss')
      .add(amount, unit)
      .format('YYYY-MM-DD HH:mm:ss');
  }
}
