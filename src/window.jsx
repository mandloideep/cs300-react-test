import { useState, useEffect } from "react";

function WindowWidth({ message, delay }) {
  const [show, setShow] = useState(false);

  function handleTimeout(delay) {
    const timerId = setTimeout(() => {
      setShow(true);
    }, delay);

    // Cancel if component unmounts early
    return () => clearTimeout(timerId);
  }

  useEffect(handleTimeout, [message, delay]);

  return show ? <p>{message}</p> : <p>Waiting...</p>;
}

export default WindowWidth;
