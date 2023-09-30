import React, { ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';

interface ModelProps {
  content: ReactNode | string;
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}

export default function Model({
  content,
  isOpen,
  onOpen,
  children,
}: ModelProps): JSX.Element {
  const { onOpen: onModalOpen } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      onModalOpen();
    }
  }, [isOpen, onModalOpen]);

  const handleModalClose = () => {
    onOpen(false);
  };

  return (
    <main>
      <Modal isOpen={isOpen} onOpenChange={handleModalClose} hideCloseButton radius='none' scrollBehavior='inside' classNames={{ wrapper: "h-full w-full bottom-0", base: "fixed my-0 bottom-0 md:bottom-auto w-full max-w-full md:max-w-md sm:my-0 rounded-t-xl md:rounded-xl", body: "bottom-0"}} >
        <ModalContent className='p-2 md:p-4 overflow-scroll'>{content}</ModalContent>
      </Modal>
      {children}
    </main>
  );
}
