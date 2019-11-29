import { Observable, from } from 'rxjs';

export default class BaseService {
  protected simulate<T>(data: T): Observable<T> {
    const promise = new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });

    return from(promise);
  }
}
