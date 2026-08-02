import { Fragment } from "react";

type Schema = Record<string, unknown>;

/**
 * Renders one or more JSON-LD blocks. `<` is escaped so a string value can never
 * break out of the <script> tag. Data is static/trusted (no user input).
 */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={i}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(block).replace(/</g, "\\u003c"),
            }}
          />
        </Fragment>
      ))}
    </>
  );
}
