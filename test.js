import {
  from,
  interval,
  map,
  Observable,
  of,
  take,
  concatMap,
  tap,
  delay,
  mergeMap,
  switchMap,
} from "rxjs";

class RxJSExamples {
  basic() {
    console.log("Before meeting pusher");

    const pusher = new Observable((junkie) => {
      console.log("Running observable logic");
      junkie.next("Meth");
      setTimeout(() => {
        junkie.next("Cocaine");
        junkie.complete();
      }, 1000``);
    });

    const junkie = pusher.subscribe((drug) => {
      console.log("Got a drug: ", drug);
    });

    console.log("After meeting pusher");
    // junkie.unsubscribe();
  }

  creationOperator() {
    // of(1, 2, 3)
    //   .pipe(map((x) => x * x))
    //   .subscribe((x) => console.log(x));
    of("abhinav")
      .pipe(map((x) => x.toUpperCase()))
      .subscribe(console.log);
  }

  testInterval() {
    interval(250).pipe(take(15)).subscribe(console.log);
  }

  test() {
    interval(2000)
      .pipe(
        // Try experimenting with concatMap, mergeMap and switchMap here.
        take(5),
        switchMap((n) =>
          interval(1000).pipe(
            take(Math.round(Math.random() * 10)),
            map((value) => `${n} - X: ${value}`),
            tap({ complete: () => console.log(`Done with ${n}`) })
          )
        )
      )
      .subscribe(console.log);
  }

  testMergeMap() {
    of(1, 2, 3)
      .pipe(
        mergeMap((n) =>
          interval(1000).pipe(
            take(Math.round(Math.random() * 10)),
            map((value) => `${n} - X: ${value}`),
            tap({ complete: () => console.log(`Done with ${n}`) })
          )
        )
      )
      .subscribe(console.log);
  }

  testConcatMap() {
    of(1, 2, 3)
      .pipe(
        concatMap((n) =>
          interval(1000).pipe(
            take(Math.round(Math.random() * 10)),
            map((value) => `${n} - X: ${value}`),
            tap({ complete: () => console.log(`Done with ${n}`) })
          )
        )
      )
      .subscribe(console.log);
  }

  simulateSwitchMap() {
    interval(2000)
      .pipe(
        take(5),
        switchMap((n) =>
          interval(1000).pipe(
            take(Math.round(Math.random() * 10)),
            map((value) => `${n} - X: ${value}`),
            tap({ complete: () => console.log(`Done with ${n}`) })
          )
        )
      )
      .subscribe(console.log);
  }
}

const examples = new RxJSExamples();
examples.testInterval();
