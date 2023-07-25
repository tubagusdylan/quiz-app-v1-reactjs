/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

/* eslint-disable no-unused-vars */
export function Timer() {
  const [secondLeft, setSecondLeft] = useState(0);

  useEffect(() => {
    if (secondLeft <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setSecondLeft(secondLeft - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondLeft]);

  function start(seconds) {
    setSecondLeft(seconds);
  }

  return { secondLeft, start };
}
