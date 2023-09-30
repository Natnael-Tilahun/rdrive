import { PopoverContent, PopoverTrigger, Popover, Modal, ModalContent, useDisclosure, Divider } from '@nextui-org/react';
import useWindowSize from '../../utils/use-window-size';

export function TitlePopover({ open, content }): JSX.Element {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isMobile, isDesktop } = useWindowSize();

  const handlePopoverClick = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <main>
      {isMobile && (
        <>
          <div onClick={handlePopoverClick}>
            {open}
          </div>
          <Modal isOpen={isOpen} onOpenChange={onClose} hideCloseButton radius='none' scrollBehavior='inside' classNames={{ wrapper: "h-full w-full bottom-0", base: "fixed my-0 bottom-0 md:bottom-auto w-full max-w-full md:max-w-md sm:my-0 rounded-t-xl md:rounded-xl  overflow-y-scroll",}}>
            <ModalContent className='p-2 md:p-4'>
              {content}
            </ModalContent>
          </Modal>
        </>
      )}

      {isDesktop && (
        <Popover offset={12} isOpen={isOpen} onOpenChange={onClose} shouldBlockScroll shouldCloseOnBlur classNames={{trigger: ["aria-expanded:scale-none", "aria-expanded:opacity-100", "subpixel-none"],}}>
          <PopoverTrigger>
            <div onClick={handlePopoverClick}>
              {open}
            </div>
          </PopoverTrigger>
          <PopoverContent>
            {content}
          </PopoverContent>
        </Popover>
      )}
    </main>
  );
}

export default TitlePopover;
