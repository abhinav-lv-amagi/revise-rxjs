import { useEffect } from "react";
import { Observable } from "rxjs";

export default function App() {
  useEffect(() => {
    const observable = new Observable<string>((subscriber) => {
      subscriber.next("Hello");
      subscriber.next("World");
      subscriber.complete(); // End stream
    });

    const sub = observable.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log("Observable complete"),
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>App</h1>
      <br />
      <p>Check console for RxJS output.</p>
    </div>
  );
}
