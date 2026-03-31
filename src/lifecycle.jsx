import { useState, useEffect } from "react";

export default function LifecycleDemo() {
  const [count, setCount] = useState(0);

  // Runs ONCE when the component mounts
  useEffect(() => {
    console.log("1. MOUNT: Component appeared on screen");

    return () => {
      console.log("3. UNMOUNT: Component is being removed");
    };
  }, []);

  // Runs every time count changes
  useEffect(() => {
    console.log(`2. UPDATE: count changed to ${count}`);
  }, [count]);

  useEffect(() => {
    console.log("5. EFFECT: This runs after every render");
  });

  return (
    <div>
      <p>Count: {count}</p>
      {console.log("4. RENDER: Component is rendering")}
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
