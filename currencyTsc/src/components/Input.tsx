import React from "react";

type InputProps = {
  options: string[];
  label: string;
  setFrom?: (from: string) => void;
  setTo?: (to: string) => void;
  from?: string;
  to?: string;
  amount?: number;
  setAmount?: (amount: number) => void;
  convertedAmount?: number;
  disabled?: boolean;
};

function Input({
  options,
  label,
  setFrom,
  setTo,
  from,
  to,
  amount,
  setAmount,
  convertedAmount,
  disabled = false,
}: InputProps) {
  return (
    <div className="inputContainer flex justify-between items-center w-full h-[10vh] p-3">
      <div className="input flex flex-col">
        <label htmlFor="From" className="text-red-500">
          {label}
        </label>
        <input
          type="text"
          id="From"
          className={`bg-gray-800 w-[25vw] focus:outline-none text-center text-white rounded-md py-2 px-4 ${
            disabled ? "opacity-70 cursor-not-allowed" : ""
          }`}
          value={setAmount ? amount || 0 : convertedAmount || 0}
          onChange={(e) =>
            setAmount ? setAmount(Number(e.target.value)) : null
          }
          disabled={disabled}
          readOnly={!setAmount}
        />
      </div>
      <div className="selection flex flex-col p-3">
        <label htmlFor="type" className="text-red-500">
          Currency
        </label>
        <select
          name=""
          id="type"
          className={`bg-red-500 px-4 py-2 rounded-md ${
            disabled ? "opacity-70 cursor-not-allowed" : ""
          }`}
          value={setFrom ? from : to}
          onChange={(e) =>
            setFrom
              ? setFrom(e.target.value)
              : setTo
              ? setTo(e.target.value)
              : null
          }
          disabled={disabled}
        >
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Input;
