import { Highlight, themes } from "prism-react-renderer";

export default function CodeViewer({ code, fileName }) {
  return (
    <div className="code-viewer">
      {fileName && <div className="code-viewer-header">{fileName}</div>}
      <Highlight theme={themes.vsLight} code={code.trim()} language="jsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              margin: 0,
              padding: 12,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="line-number">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
