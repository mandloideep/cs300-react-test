// ============================================================
// Fetch Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import FetchOnMount from "./FetchOnMount";
import PostExample from "./PostExample";
import FetchOnMountCode from "./FetchOnMount.jsx?raw";
import PostExampleCode from "./PostExample.jsx?raw";

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
