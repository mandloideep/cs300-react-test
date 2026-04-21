// ============================================================
// Fetch Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import FetchOnMount from "./FetchOnMount";
import PostExample from "./PostExample";
import FetchOnMountCode from "./FetchOnMount.jsx?raw";
import PostExampleCode from "./PostExample.jsx?raw";

const NOTES = (
  <TabNotes
    title="Fetching Data — Mental Model"
    mentalModel={
      <>
        <p>
          A fetch has <strong>four states</strong>: idle, loading, success
          (data), and error. The UI must know which one it's in so it can
          show a spinner, the data, or an error message. Track them
          explicitly — don't try to infer "loading" from "data is falsy".
        </p>
        <p>
          Fetches are <strong>side effects</strong>, so they go in{" "}
          <code>useEffect</code>, never during render. The request starts
          after the component mounts; the response arrives later and sets
          state, which re-renders with the data.
        </p>
        <p>
          If the component unmounts (or the input changes) while a request
          is in flight, cancel the old one with <code>AbortController</code>{" "}
          — otherwise the late response overwrites fresh data.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Track loading, data, and error as separate state (or one status union).",
      },
      {
        kind: "do",
        text: "Fetch inside useEffect, not in the component body.",
      },
      {
        kind: "do",
        text: "Return a cleanup that aborts the request when the component unmounts or dependencies change.",
      },
      {
        kind: "do",
        text: "Check response.ok before parsing — fetch does NOT throw on 4xx/5xx.",
      },
      {
        kind: "dont",
        text: "Don't assume data is loaded just because there's no error — always branch on loading.",
      },
    ]}
    gotchas={[
      "fetch only rejects on network errors. A 404 or 500 still resolves — check response.ok yourself.",
      "Race conditions: if the user types 'a' then 'ab', the 'a' response may arrive last. AbortController cleanup prevents this.",
      "Don't call setState after unmount — React warns. AbortController + cleanup avoids it.",
      "Async functions can't be passed directly to useEffect. Define an inner async function and call it.",
    ]}
    snippet={`useEffect(() => {
  const ctrl = new AbortController();

  (async () => {
    try {
      setLoading(true);
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) throw new Error(res.status);
      setData(await res.json());
    } catch (e) {
      if (e.name !== "AbortError") setError(e);
    } finally {
      setLoading(false);
    }
  })();

  return () => ctrl.abort();   // cancel on unmount / dep change
}, [url]);`}
    snippetLabel="Fetch with loading/error + abort"
  />
);

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you fetch data in real apps?</h3>
    <ul>
      <li>
        <strong>Loading page data on mount</strong> — fetch a user profile,
        product list, or dashboard stats when the component first appears
      </li>
      <li>
        <strong>Search-as-you-type</strong> — send a GET request each time the
        search query changes (debounced with useEffect)
      </li>
      <li>
        <strong>Submitting forms</strong> — POST a new account, a comment, or an
        order to your backend
      </li>
      <li>
        <strong>Pagination and infinite scroll</strong> — fetch the next page of
        results when the user scrolls or clicks "Load More"
      </li>
      <li>
        <strong>Polling for updates</strong> — check for new messages or
        notifications on an interval
      </li>
      <li>
        <strong>Loading and error states</strong> — show a spinner while waiting
        and an error message if the request fails
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: always fetch inside a useEffect (not during render), always
      track loading and error states, and always handle the case where the
      component unmounts before the response arrives.
    </p>
  </div>
);

const sections = [
  { label: "Notes", content: NOTES },
  {
    label: "A. Fetch on Mount",
    content: <FetchOnMount />,
    code: FetchOnMountCode,
  },
  { label: "B. POST Example", content: <PostExample />, code: PostExampleCode },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function FetchDemo() {
  return (
    <div className="demo-section">
      <h2>Intro to Fetching Data</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
