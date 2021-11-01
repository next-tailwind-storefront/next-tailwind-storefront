import { ReactElement } from "react";

export default function Grid({ children }: { children: ReactElement }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">{children}</div>
      </div>
    </section>
  );
}
