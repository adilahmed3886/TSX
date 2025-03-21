import { useEffect, useState } from "react";
import { useCurrency } from "./hooks/useCurrency";
import Input from "./components/Input";

function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { data, loading, error: apiError } = useCurrency(from);

  const options = Object.keys(data);

  const handleSwap = () => {
    const tempFrom = from;
    const tempAmount = amount;

    setFrom(to);
    setTo(tempFrom);
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
  };

  const convert = () => {
    if (!data || Object.keys(data).length === 0) {
      return;
    }

    if (to && data[to] && amount !== undefined) {
      try {
        const rate = data[to];
        const result = amount * rate;
        setConvertedAmount(Number(result.toFixed(2)));
        setError(null);
      } catch (err) {
        setError("Error converting currency. Please try again.");
        console.error("Conversion error:", err);
      }
    }
  };

  useEffect(() => {
    if (!loading && data && Object.keys(data).length > 0) {
      convert();
    }

    if (apiError) {
      setError(apiError);
    }
  }, [from, to, amount, data, loading, apiError]);

  return (
    <>
      <div className="main bg-zinc-900 h-screen w-full flex flex-col items-center justify-center">
        <div className="converterContainer w-[80vw] md:w-[60vw] lg:w-[40vw] h-auto bg-black text-white shadow-xl shadow-black/50 p-8 rounded-lg relative flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>

          {error && (
            <div className="error-message bg-red-800 p-3 w-full rounded-md mb-2">
              {error}
            </div>
          )}

          {loading && (
            <div className="loading text-yellow-500">
              Loading exchange rates...
            </div>
          )}

          <Input
            from={from}
            options={options}
            label={"From"}
            setFrom={setFrom}
            amount={amount}
            setAmount={setAmount}
            disabled={loading}
          />

          <button
            onClick={handleSwap}
            className="bg-red-500 hover:bg-red-600 transition-colors px-6 py-2 rounded-md"
            disabled={loading}
          >
            Swap
          </button>

          <Input
            to={to}
            options={options}
            label={"To"}
            setTo={setTo}
            convertedAmount={convertedAmount}
            disabled={loading}
          />
        </div>
      </div>
    </>
  );
}

export default App;
