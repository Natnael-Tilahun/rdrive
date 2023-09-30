import { PopoverContent, PopoverTrigger, Popover, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { GoChevronDown } from 'react-icons/go';
import useWindowSize from '../../utils/use-window-size';

export function LinkPopover({ open, content }): JSX.Element {

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
          <button className="flex items-center gap-1" onClick={handlePopoverClick}>
            {open} <GoChevronDown className={`h-4 w-4 transition-transform transform ${isOpen ? "rotate-180" :''}`} />
          </button>
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
            <button onClick={handlePopoverClick}  className="flex items-center gap-1">
              {open} <GoChevronDown className={`h-4 w-4 transition-transform transform ${isOpen ? "rotate-180" :''}`} />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            {content}
          </PopoverContent>
        </Popover>
      )}
    </main>
  );
}

export default LinkPopover;
