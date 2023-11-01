import { Snippet } from "@nextui-org/react";
import { ReactNode, useRef } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

const Pre = ({ children }: { children?: ReactNode }) => {


  return (
    <main className="border border-gray-400/30 !rounded-md my-4">
      <div className="items-end flex justify-end px-2 my-2"><Snippet size="sm" hideSymbol classNames={{base: "-p-1 bg-transparent", pre: "hidden"}} copyIcon={<MdOutlineContentCopy />}>{children}</Snippet></div>
      <div className="border-b border-gray-400/30" />
      <pre className="!w-full">
      {children}
      </pre>
    </main>
  );
};

export default Pre;