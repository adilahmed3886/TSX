import { useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef<HTMLInputElement>(null);

  const copyPassword = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);
  };

  const generatePassword = () => {
    const numbersS: string = "0123456789";
    const symbolsS: string = "!@#$%^&*()_+";
    const letters: string =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password: string = "";
    const allChars: string[] = [...letters];
    if (numbers) allChars.push(...numbersS);
    if (symbols) allChars.push(...symbolsS);
    for (let i = 0; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return password;
  };

  useEffect(() => {
    setPassword(generatePassword());
  }, [length, numbers, symbols]);
  return (
    <>
      <div className="w-[100vw] h-[100vh] p-10 bg-black flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl font-bold mb-4">{`Length: ${length}`}</h1>
        <div className="generator w-[40vw] h-[15vh] bg-red-500 p-8 rounded-lg">
          <div className="inputs flex items-center h-[40px] w-full">
            <input
              value={password}
              type="text"
              className="w-full h-full text-center rounded-l-lg bg-black text-white focus:outline-none"
              readOnly={true}
              ref={passwordRef}
            />
            <button
              className="bg-black text-red-500 cursor-pointer px-4 py-2 rounded-r-lg hover:bg-red-900 hover:text-white transition-all duration-300 ease-in-out"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex items-center justify-center mt-5 gap-5">
            <input
              type="range"
              name="length"
              id="length"
              min={8}
              max={24}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              onChange={() => setNumbers((prev) => !prev)}
            />
            <label htmlFor="numbers">Numbers</label>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              onChange={() => setSymbols((prev) => !prev)}
            />
            <label htmlFor="symbols">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
