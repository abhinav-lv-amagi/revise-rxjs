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
      }, 1000);
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

  /**
   * ConcatMap will wait for the previous observable to complete before starting the next one.
   * This particular function takes an arrary (1,2,3), and for each element, it will emit a random no. of values (n: [0, 10]).
   * So, for each element, it will emit n values, and then move to the next element.
   * We can see for each element, the no. of values emitted is different.
   */
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

  /**
   * MergeMap will not wait for the previous observable to complete before starting the next one.
   * This particular function takes an arrary (1,2,3), and for each element, it will emit a random no. of values (n: [0, 10]).
   * So, for each element, it will emit n values, but the processing for each element happens in parallel.
   * We can see for each element, the no. of values emitted is different, and the values for each element appear together.
   */
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

  /**
   * SwitchMap will cancel the previous observable before starting the next one.
   * This particular function takes an arrary (1,2,3), and for each element, it will emit a random no. of values (n: [0, 10]).
   * But here, each element may not have the chance to complete its processing, as the next element will cancel the previous one.
   * So you may see that some elements start processing, but the next element begins before the previous one sends the `Done with n` message.
   * Try adjusting the outer interval period and inner interval period to see different effects.
   */
  simulateSwitchMap() {
    interval(2000)
      .pipe(
        take(5),
        switchMap((n) =>
          interval(500).pipe(
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
const test = 6;
switch (test) {
  case 0:
    examples.test();
    break;
  case 1:
    examples.basic();
    break;
  case 2:
    examples.creationOperator();
    break;
  case 3:
    examples.testInterval();
    break;
  case 4:
    examples.testConcatMap();
    break;
  case 5:
    examples.testMergeMap();
    break;
  case 6:
    examples.simulateSwitchMap();
    break;
  default:
    console.log("No test case found");
    break;
}
