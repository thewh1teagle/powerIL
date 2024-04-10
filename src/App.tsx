import "@fontsource-variable/heebo";
import { useState } from "react";
import pricesJSON from "./assets/price.json";
import { calcPricePerHour, getRecentPrice } from "./utils";
import GitHubCorners from "@uiw/react-github-corners";

function App() {
  const currentPrice = getRecentPrice(
    pricesJSON
  ) as any as (typeof pricesJSON)[0];
  const [measure, setMeasure] = useState<"watt" | "kwatt">("watt");
  const [amount, setAmount] = useState<number>();
  const [show, setShow] = useState(false);

  let pricePerHour: number | string = 0;
  if (amount) {
    pricePerHour = calcPricePerHour(currentPrice.kwPrice, measure, amount);
  }

  const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const pricePerMonth = (pricePerHour * 30 * 24).toLocaleString("en", options);
  const pricePerYear = (pricePerHour * 30 * 24 * 365).toLocaleString(
    "en",
    options
  );
  pricePerHour = pricePerHour.toLocaleString("en", options);
  const result = [
    { label: "שעה", value: pricePerHour },
    { label: "חודש", value: pricePerMonth },
    { label: "שנה", value: pricePerYear },
  ];
  let infoLine =
    "חושב לפי " +
    currentPrice.kwPrice +
    " אגורות" +
    (currentPrice.includeVat ? ' (כולל מע"מ)' : ' (לא כולל מע"מ)') +
    ' לקוט"ש נכון לשנת ' +
    currentPrice.year;

  return (
    // https://bg.ibelick.com/
    <div dir="rtl" className="w-full h-full">
      <GitHubCorners
        position="right"
        href="https://github.com/thewh1teagle/powerIL"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="w-[500px] max-w-[100vw] p-5 m-auto">
        <div className="text-3xl lg:text-4xl text-center mt-10">חישוב צריכת חשמל</div>
        <div className="flex flex-row mt-10 gap-1">
          <select
            defaultValue={measure}
            onChange={(e) => setMeasure(e.target.value as any)}
            className="select select-bordered"
          >
            <option value="watt">וואט</option>
            <option value="kwatt">קילו וואט</option>
          </select>
          <input
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            type="number"
            className="input input-bordered flex-1"
            placeholder="כמות"
          />
        </div>
        <button
          onClick={() => setShow(typeof amount === "number" && amount > 0)}
          className="btn btn-primary w-full mt-2"
        >
          חישוב
        </button>
        {show && typeof amount === "number" && amount > 0 && (
          <>
            <div className="flex flex-col gap-2 mt-5 flex-wrap">
              {result.map((details) => (
                <div className="card text-center shadow-lg bg-base-100 rounded-lg p-10">
                  <div className="text-xl">{details.label}</div>
                  <div className="text-xl">{details.value}₪</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-6">
            <a target="_blank" href={currentPrice.url} className="text-md text-center opacity-50 link link-hover">
              {infoLine}
            </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
