// ============================================================
// Step 1: Basic List
// ============================================================

const INITIAL_BOOKMARKS = [
  { id: 1, title: "React Docs", url: "https://react.dev", category: "Docs" },
  {
    id: 2,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    category: "Docs",
  },
  { id: 3, title: "GitHub", url: "https://github.com", category: "Tools" },
];

export default function Step1_BasicList() {
  console.log(
    "📚 BOOKMARKS: rendering list with",
    INITIAL_BOOKMARKS.length,
    "items",
  );

  return (
    <div className="demo-subsection">
      <h3>Step 1: Basic List</h3>

      <div className="bookmark-list">
        {INITIAL_BOOKMARKS.map((bookmark) => (
          <div key={bookmark.id} className="bookmark-card">
            <h4>{bookmark.title}</h4>
            <p className="bookmark-url">{bookmark.url}</p>
            <span className="bookmark-category">{bookmark.category}</span>
          </div>
        ))}
      </div>

      <div className="demo-note">
        Starting simple: a hardcoded array rendered with <code>.map()</code>.
        Each item needs a unique <code>key</code> prop. Next step: let users add
        bookmarks.
      </div>
    </div>
  );
}
