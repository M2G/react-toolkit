/* eslint-disable */
import React, {
  useEffect,
  useRef,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import ModalContent from './ModalContent';
import './index.scss';

type ModalProps = React.HTMLProps<HTMLDivElement> & {
  isOpen: boolean;
  mountNode?: HTMLElement | null;
  closeOnEscape?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

const escape: string = 'Escape';
const modalWrapper = document.createElement('div');

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  mountNode,
  closeOnEscape,
  onOpen,
  onClose,
  children,
}) => {
  const mounted: MutableRefObject<boolean> = useRef(false);

  function onKeyUp(e: KeyboardEvent) {
    if (e.key === escape) {
      if (onClose) {
        onClose();
      }
    }
  }

  useEffect(() => {
    mountNode?.appendChild(modalWrapper);
    mounted.current = true;
    if (closeOnEscape) {
      window.addEventListener('keyup', onKeyUp);
    }
    return () => {
      if (mountNode?.firstChild) {
        mountNode.removeChild(mountNode.firstChild);
      }
      if (closeOnEscape) {
        window.removeEventListener('keyup', onKeyUp);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // @ts-ignore
      mountNode?.removeChild(mountNode?.firstChild);
    } else {
      mountNode?.appendChild(modalWrapper);
      if (onOpen) {
        onOpen();
      }
    }
  }, [isOpen]);

  return (
    <ModalContent
      isOpen={isOpen}
      onClose={onClose}
      mountOn={modalWrapper}
      parentMounted={mounted.current}
    >
      {children}
    </ModalContent>
  );
};

Modal.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  closeOnEscape: false,
};

export default Modal;

