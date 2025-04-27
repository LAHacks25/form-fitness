import "./Carousel.css";
import { useState, useEffect, useRef } from "react";
import pushup from "../assets/pushup.webp";
import situps from "../assets/situps.jpg";
import legraise from "../assets/legraise.webp";
import { Ref } from "react";

const useInterval = (
  callback: () => object | null | void,
  delay?: number | null
) => {
  const savedCallback = useRef<() => null | object | void>(() => null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
};

const Card = ({
  img,
  idx,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  img: string;
  idx: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  let style = {};

  if (idx == 0)
    style = { opacity: 0.8, transform: "translateX(-45%) scale(0.8)" };
  if (idx == 1) style = { zIndex: 1 };
  if (idx == 2)
    style = { opacity: 0.8, transform: "translate(45%) scale(0.8)" };

  return (
    <div
      className="card"
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={img} />
    </div>
  );
};

const Carousel = () => {
  const [arr, setArr] = useState([situps, pushup, legraise]);
  const [isRolling, setIsRolling] = useState(true);

  const updateArr = (idx: number) => {
    const [a, b, c] = arr;

    if (idx == 0) {
      setArr([c, a, b]);
    } else {
      setArr([b, c, a]);
    }
  };

  useInterval(
    () => {
      updateArr(2);
    },
    isRolling ? 3000 : null
  );

  return (
    <div>
      {arr.map((item, idx) => (
        <Card
          key={item}
          idx={idx}
          img={item}
          onClick={() => updateArr(idx)}
          onMouseEnter={() => setIsRolling(false)}
          onMouseLeave={() => setIsRolling(true)}
        />
      ))}
    </div>
  );
};

export default Carousel;
