import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { useCallback, useEffect, useState } from 'react';

export class CallState<T> {
  constructor(public data: T, public isLoading = false, public error = '') {}
}

export const useApiCall = <T extends any>(serviceObservable: Observable<T>, initCallState: CallState<T>) => {
  const [state, setState] = useState(initCallState);

  const handleApiCall = useCallback(() => {
    setState(new CallState<T>(initCallState.data, true));

    return serviceObservable.pipe(
      tap(data => setState(new CallState<T>(data))),
      catchError(err => of(setState(new CallState<T>(initCallState.data, false, 'Error occured !'))))
    );
  }, []);

  useEffect(() => {
    const sub = handleApiCall().subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return state;
};
