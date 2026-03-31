export default function Layout({ header, children, footer }) {
  return (
    <div className="panel">
      <div className="panel-header">{header}</div>
      <div className="panel-body">{children}</div>
      <div className="panel-footer">{footer}</div>
    </div>
  );
}
