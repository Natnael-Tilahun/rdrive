"use client";

import { Dispatch, SetStateAction } from "react";
import { Drawer } from "vaul";
import * as Dialog from "@radix-ui/react-dialog";
import useMediaQuery from "../../utils/hooks/use-media-query";
import { cn } from "../../utils/utils";
import { ScrollShadow } from "@nextui-org/react";

export default function Modal({
  children,
  className,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode;
  className?: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer.Root open={showModal} onOpenChange={setShowModal}>
      <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 dark:bg-black dark:bg-opacity-10" />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t dark:border-none bg-white dark:bg-gray-850">
        <div className="flex w-full items-center justify-center">
            <div className="mt-3 h-1 w-12 rounded-full bg-gray-300" />
        </div>
        <div className="flex min-h-[150px] w-full items-center justify-center overflow-hidden my-3 px-1.5">
        {children}
        </div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
    );
  }
  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal}>
      <Dialog.Portal>
        <Dialog.Overlay
          id="modal-backdrop"
          className="animate-fade-in fixed inset-0 z-40 bg-gray-100 bg-opacity-10 dark:bg-black dark:bg-opacity-10"
        />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border dark:border-none bg-white dark:bg-gray-850 p-0 shadow-xl md:rounded-2xl",
            className,
          )}
        >
          <div className="flex min-h-[150px] w-full items-center justify-center overflow-y-scroll my-2 px-1.5">
          <ScrollShadow>
           {children}
           </ScrollShadow>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
