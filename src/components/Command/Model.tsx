"use client";

import { Dispatch, SetStateAction } from "react";
import { Drawer } from "vaul";
import * as Dialog from "@radix-ui/react-dialog";
import useMediaQuery from "../../utils/hooks/use-media-query";
import { cn } from "../../utils/utils";

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
        <Drawer.Overlay
          className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 dark:bg-black dark:bg-opacity-10"
        />
        <Drawer.Portal>
          <Drawer.Content className="z-50 bottom-0 top-auto w-[100%] max-w-[100%] fixed overscroll-none max-h-[80vh] min-h-[5dvh] border-t-1.5 border-gray-400/30 rounded-t-lg bg-white dark:bg-black">
          <div className="h-full overflow-hidden">{children}</div>
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
          className="animate-fade-in fixed inset-0 z-40 bg-white opacity-30 dark:bg-black dark:opacity-25"
        />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "fixed left-[50%] top-[25%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-25%] gap-4 border-1.5 border-gray-400/30 bg-background duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full overflow-hidden p-0 shadow-lg",
            className,
          )}
        >
          <div className="h-full overflow-hidden">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
