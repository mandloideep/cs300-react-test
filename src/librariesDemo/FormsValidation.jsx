export default function FormsValidation() {
  return (
    <div className="demo-subsection">
      <h3>B. Forms & Validation</h3>
      <p className="demo-note">
        Forms are one of the most complex parts of any web app. These libraries
        handle validation, error messages, field state, and submission — so you
        don't have to build it from scratch.
      </p>

      {/* React Hook Form */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>React Hook Form</h4>
        <p>
          <strong>What:</strong> Performant form handling with minimal
          re-renders, built on uncontrolled components and refs.
        </p>
        <p>
          <strong>Why:</strong> The most popular React form library. Uses refs
          internally so the form doesn't re-render on every keystroke (unlike
          controlled forms with <code>useState</code>). Built-in validation,
          error handling, and easy integration with UI libraries.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install react-hook-form
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> {"{ useForm }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"react-hook-form"</span>;
          <br />
          <br />
          <span className="keyword">function</span>{" "}
          <span className="component">SignupForm</span>() {"{"}
          <br />
          {"  "}
          <span className="keyword">const</span>{" "}
          {"{ register, handleSubmit, formState: { errors } }"} ={" "}
          <span className="hook">useForm</span>();
          <br />
          <br />
          {"  "}
          <span className="keyword">return</span> (
          <br />
          {"    "}&lt;form onSubmit={"{"}handleSubmit((data) =&gt;
          console.log(data)){"}"}&gt;
          <br />
          {"      "}&lt;input
          <br />
          {"        "}
          {"{"}...register(<span className="string">"email"</span>, {"{"}
          <br />
          {"          "}required:{" "}
          <span className="string">"Email is required"</span>,
          <br />
          {"          "}pattern:{" "}
          {'{ value: /\\S+@\\S+/, message: "Invalid email" }'}
          <br />
          {"        "}
          {"}"}){"}"}
          <br />
          {"      "}/&gt;
          <br />
          {"      "}
          {"{"}errors.email &amp;&amp; &lt;span&gt;{"{"}errors.email.message
          {"}"}&lt;/span&gt;{"}"}
          <br />
          {"      "}&lt;button type=<span className="string">"submit"</span>
          &gt;Sign Up&lt;/button&gt;
          <br />
          {"    "}&lt;/form&gt;
          <br />
          {"  "});
          <br />
          {"}"}
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://react-hook-form.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* TanStack Form */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>TanStack Form</h4>
        <p>
          <strong>What:</strong> Type-safe, headless form management with
          first-class TypeScript support.
        </p>
        <p>
          <strong>Why:</strong> Newer alternative to React Hook Form with better
          TypeScript inference. Headless design means you control the UI
          completely. Part of the TanStack ecosystem so it integrates well with
          TanStack Query.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install @tanstack/react-form
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> {"{ useForm }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"@tanstack/react-form"</span>;
          <br />
          <br />
          <span className="keyword">function</span>{" "}
          <span className="component">ContactForm</span>() {"{"}
          <br />
          {"  "}
          <span className="keyword">const</span> form ={" "}
          <span className="hook">useForm</span>({"{"}
          <br />
          {"    "}defaultValues: {'{ name: "", email: "" }'},
          <br />
          {"    "}onSubmit: ({"{ value }"}) =&gt; console.log(value),
          <br />
          {"  "}
          {"}"});
          <br />
          <br />
          {"  "}
          <span className="keyword">return</span> (
          <br />
          {"    "}&lt;form onSubmit={"{"}form.handleSubmit{"}"}&gt;
          <br />
          {"      "}&lt;form.Field name=<span className="string">"name"</span>
          &gt;
          <br />
          {"        "}
          {"{"}(field) =&gt; &lt;input {"{ ...field.getInputProps() }"} /&gt;
          {"}"}
          <br />
          {"      "}&lt;/form.Field&gt;
          <br />
          {"    "}&lt;/form&gt;
          <br />
          {"  "});
          <br />
          {"}"}
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://tanstack.com/form/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* Zod */}
      <div className="card">
        <h4>Zod</h4>
        <p>
          <strong>What:</strong> TypeScript-first schema validation — define a
          schema, validate data, get type inference for free.
        </p>
        <p>
          <strong>Why:</strong> Works with both React Hook Form and TanStack
          Form. Validate form input, API responses, environment variables — any
          data at any boundary. One schema gives you both runtime validation and
          TypeScript types.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install zod
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> {"{ z }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"zod"</span>;
          <br />
          <br />
          <span className="comment">{"// Define schema"}</span>
          <br />
          <span className="keyword">const</span> UserSchema = z.object({"{"}
          <br />
          {"  "}name: z.string().min(2,{" "}
          <span className="string">"Name too short"</span>),
          <br />
          {"  "}email: z.string().email(
          <span className="string">"Invalid email"</span>),
          <br />
          {"  "}age: z.number().min(13).max(120),
          <br />
          {"}"});
          <br />
          <br />
          <span className="comment">{"// Validate"}</span>
          <br />
          <span className="keyword">const</span> result =
          UserSchema.safeParse(formData);
          <br />
          <span className="keyword">if</span> (!result.success) {"{"}
          <br />
          {"  "}console.log(result.error.issues);{" "}
          <span className="comment">{"// detailed error messages"}</span>
          <br />
          {"}"}
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </p>
      </div>

      <div className="demo-practical">
        <h3>How these work together</h3>
        <ul>
          <li>
            <strong>React Hook Form + Zod:</strong> Use{" "}
            <code>@hookform/resolvers/zod</code> to plug a Zod schema directly
            into React Hook Form for type-safe validation.
          </li>
          <li>
            <strong>TanStack Form + Zod:</strong> TanStack Form has built-in Zod
            adapter via <code>@tanstack/zod-form-adapter</code>.
          </li>
          <li>
            <strong>Choose one form library</strong> — React Hook Form is more
            mature and has more community resources. TanStack Form is newer with
            better TypeScript DX.
          </li>
        </ul>
      </div>
    </div>
  );
}
