"use client";

import { Dispatch, SetStateAction } from "react";
import { Drawer } from "vaul";
import * as Dialog from "@radix-ui/react-dialog";
import useMediaQuery from "../../../utils/hooks/use-media-query";
import { cn } from "../../../utils/utils";

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
          <Drawer.Content className="z-50 bottom-0 top-auto w-[100%] max-w-[100%] fixed max-h-[80vh] min-h-[5dvh] border-t-1.5 border-gray-400/30 rounded-t-lg bg-white dark:bg-black">
          <div className="flex w-full items-center justify-center mb-2">
            <div className="mt-3 h-1 w-12 rounded-full bg-gray-300" />
          </div>
          {children}
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
            "animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-2xl overflow-hidden border-1.5 border-gray-400/30 bg-white dark:bg-black p-0 shadow-xl md:rounded-2xl",
            className,
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
