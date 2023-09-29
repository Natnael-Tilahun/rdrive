"use client";

import { Dispatch, SetStateAction, ReactNode} from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Leaflet from "./leaflet";
import useWindowSize from "../../utils/use-window-size";

export default function Popover({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}) {
  const { isMobile, isDesktop } = useWindowSize();
  if (!isMobile && !isDesktop) return <>{children}</>;
  return (
    <>
      {isMobile && children}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>{content}</Leaflet>
      )}
      {isDesktop && (
        <PopoverPrimitive.Root
          open={openPopover}
          onOpenChange={(isOpen) => setOpenPopover(isOpen)}
        >
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={8}
            align={align}
            className="z-20 animate-slide-up-fade items-center rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-850"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
}
