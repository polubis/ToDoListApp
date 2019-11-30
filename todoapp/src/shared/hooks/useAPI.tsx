import { Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { useEffect, useMemo, useState } from 'react';

export type UseAPIConfig = {
  responseDelay: number;
};

export const useAPI = <R extends any, P = any>(
  serviceAsyncMethod: (payload: P) => Observable<R>,
  onSuccess: (response: R) => void = () => {},
  onFailure: (error: string) => void = () => {},
  configuration: UseAPIConfig = { responseDelay: 0 }
): [boolean, (payload?: P) => void] => {
  const [isPending, setIsPending] = useState(false);

  const sending = useMemo(() => new Subject<P>(), []);

  const sending$ = useMemo(
    () =>
      sending.asObservable().pipe(
        tap(() => setIsPending(true)),
        debounceTime(300),
        delay(configuration.responseDelay),
        switchMap(payload =>
          serviceAsyncMethod(payload).pipe(
            tap((response: R) => {
              setIsPending(false);
              onSuccess(response);
            }),
            catchError((error: string) => {
              setIsPending(false);
              onFailure(error);
              return of(null);
            })
          )
        )
      ),
    []
  );

  const callAPI = (payload?: P) => {
    if (!isPending) {
      sending.next(payload);
    }
  };

  useEffect(() => {
    const sub = sending$.subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return [isPending, callAPI];
};
