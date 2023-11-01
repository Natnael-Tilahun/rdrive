import { Snippet } from "@nextui-org/react";
import { ReactNode, useRef } from "react";

const Pre = ({ children }: { children?: ReactNode }) => {
  const textInput = useRef<HTMLDivElement>(null);


  return (
    <div className="relative mb-3 -mt-[4px]" ref={textInput}>
      <div className="z-10 absolute right-2 top-5">
      <Snippet size="sm" hideSymbol classNames={{base: "-p-1 bg-transparent ", pre: "hidden"}}>{children}</Snippet>
      </div>
      <pre className="!my-0 !rounded-md  !w-full !py-3 !pt-6 border border-gray-400/30">
        {children}
      </pre>
    </div>
  );
};

export default Pre;
