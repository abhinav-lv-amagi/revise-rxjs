import { useEffect, useState } from "react";
import { interval, switchMap, tap } from "rxjs";

const fetchStockPrice = async () => {
  return new Promise<string>((resolve) => {
    const price = (Math.random() * 1500).toFixed(2);
    setTimeout(() => {
      resolve(price);
    }, 1000);
  });
};
export default function StockPrice() {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    // if this interval is less than the time taken
    // to fetch the stock price, the price will not be updated.
    const subscription = interval(2000)
      .pipe(
        switchMap(() => fetchStockPrice()),
        tap((newPrice) => console.log("New price: ", newPrice))
      )
      .subscribe(setPrice);

    return () => subscription.unsubscribe();
  }, []);
  return <div>{`Stock Price: $${price}`}</div>;
}
