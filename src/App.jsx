import Button from "./button";
import DangerButton from "./dangerButton";
import Layout from "./layout";
import { useState } from "react";
import LifecycleDemo from "./lifecycle";
import WindowWidth from "./window";

function App() {
  const [, setShow] = useState(true);

  function toggleShow() {
    setShow((prevShow) => !prevShow);
  }

  return (
    <Layout
      header={<h1>Header</h1>}
      footer={<h1>Footer</h1>}
    >
      <p>This is the body.</p>

      <Button
        variant="primary"
        onClick={() => alert("Primary button clicked!")}
      >
        Primary Button
      </Button>

      <Button
        variant="secondary"
        onClick={() => alert("Secondary button clicked!")}
      >
        Secondary Button
      </Button>

      <DangerButton onClick={() => alert("Danger button clicked!")}>
        Danger Button
      </DangerButton>

      <div>
        <Button
          variant="secondary"
          onClick={toggleShow}
        >
          Toggle Show
        </Button>

        <WindowWidth
          message="Hello, World!"
          delay={1000}
        />
      </div>
    </Layout>
  );
}

export default App;
