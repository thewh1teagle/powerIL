import pricesJSON from "./assets/price.json";

export function getRecentPrice(prices: typeof pricesJSON) {
  let mostRecentPrice = null;
  let mostRecentTime = 0;

  prices.forEach((price) => {
    if (price.date > mostRecentTime) {
      mostRecentTime = price.date;
      mostRecentPrice = price;
    }
  });

  return mostRecentPrice;
}

export function calcPricePerHour(
  kwPrice: number,
  measure: "watt" | "kwatt",
  amount: number
): number {
  console.log('measure => ', measure)
  let kwAmount: number;

  // Convert amount to kilowatts if the measure is in watts
  if (measure === "watt") {
    kwAmount = amount / 1000; // Convert watts to kilowatts
  } else {
    kwAmount = amount; // Already in kilowatts
  }
  // Calculate the price per hour
  const totalPrice = kwAmount * kwPrice;
  return totalPrice;
}
