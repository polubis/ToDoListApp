import { Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { useEffect, useMemo, useState } from 'react';

export type UseAPIConfig = {
  responseDelay: number;
};

export const useAPI = <R extends any, P = any>(
  serviceAsyncMethod: (payload: P) => Observable<R>,
  onSuccess: (response: R, payload: P) => void = () => {},
  onFailure: (error: string) => void = () => {},
  configuration: UseAPIConfig = { responseDelay: 0 }
): [boolean, (payload?: P) => void] => {
  const [isPending, setIsPending] = useState(false);

  const sending = useMemo(
    () => new Subject<P>(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
              onSuccess(response, payload);
            }),
            catchError((error: string) => {
              setIsPending(false);
              onFailure(error);
              return of(null);
            })
          )
        )
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isPending, callAPI];
};
