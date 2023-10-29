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
      <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 dark:bg-black dark:bg-opacity-10" />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t dark:border-gray-700 bg-white dark:bg-black">
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
          className="animate-fade-in fixed inset-0 z-40 bg-gray-100 bg-opacity-10 dark:bg-black dark:bg-opacity-10"
        />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "animate-scale-in fixed top-[15%] left-0 right-0 rounded-xl z-40 m-auto max-w-2xl overflow-hidden border dark:border-gray-700 bg-white dark:bg-black",
            className,
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
