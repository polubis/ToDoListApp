import { Observable, of } from 'rxjs';

import { delay } from 'rxjs/operators';

export default class BaseService {
  protected simulate = <T>(data: any): Observable<T> => of(data).pipe(delay(1500));
}
