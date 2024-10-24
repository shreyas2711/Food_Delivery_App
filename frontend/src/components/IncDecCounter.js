import { useState } from "react";

function IncDecCounter({ setQuantity, itemId }) {
  const [num, setNum] = useState(0);

  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [itemId]: num + 1 // Update the quantity for the specific itemId
      }));
    }
  };

  let decNum = () => {
    if (num > 0) {
      setNum(num - 1);
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [itemId]: num - 1 // Update the quantity for the specific itemId
      }));
    }
  };

  let handleChange = (e) => {
    setNum(e.target.value);
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemId]: e.target.value // Update the quantity for the specific itemId
    }));
  };

  return (
    <>
      <div className="col-xl-1">
        <div class="input-group">
          <div class="input-group-prepend">
            <button class="btn btn-outline-primary" type="button" onClick={decNum}>-</button>
          </div>
          <input type="text" class="form-control" value={num} onChange={handleChange} />
          <div class="input-group-prepend">
            <button class="btn btn-outline-primary" type="button" onClick={incNum}>+</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncDecCounter;
