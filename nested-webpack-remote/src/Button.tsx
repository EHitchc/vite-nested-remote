import { useState } from "react";

const style = {
  background: "#800",
  color: "#fff",
  padding: 12,
};

const Button = () => {
  const [count, setCount] = useState(0);

  return (
    <button id='button' style={style} onClick={() => setCount((prevCount) => prevCount+1)}>
      Webpack Remote Button: {count}
    </button>
  );
};

export default Button;
