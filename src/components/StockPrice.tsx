import { useEffect, useState } from "react";
import { interval, switchMap } from "rxjs";

const fetchStockPrice = async () => {
  return new Promise<string>((resolve) => {
    const price = (Math.random() * 1500).toFixed(2);
    setTimeout(() => {
      resolve(price);
    }, 1000); // this can be a random time b/w 1000 and 3000 to simulate the network latency and working of switchMap
  });
};

/**
 * This component demonstrates the use of `switchMap` operator.
 * We fetch the stock price every 2 seconds. If the previous fetch
 * is not completed, the new fetch will cancel the previous one.
 * @returns The StockPrice component
 */
export default function StockPrice() {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    // if this interval is less than the time taken
    // to fetch the stock price, the price will not be updated.
    const subscription = interval(2000)
      .pipe(switchMap(() => fetchStockPrice()))
      .subscribe(setPrice);

    return () => subscription.unsubscribe();
  }, []);
  return (
    <div>
      <h2>Stock Market</h2>
      <p style={{ marginBottom: "20px" }}>(switchMap)</p>
      {`Stock Price: ${price ? "$" + price : "loading"}`}
    </div>
  );
}
