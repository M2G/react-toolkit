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
  mountNode?: ChildNode | null;
  onOpen?: () => void;
  onClose?: () => void;
};

const modalWrapper = document.createElement('div');

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  mountNode,
  onOpen,
  onClose,
  children
}) => {
  // @ts-ignore
  const mounted: MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    mountNode?.appendChild(modalWrapper);
    mounted.current = true;
    return () => {
      if (mountNode?.firstChild) {
        mountNode.removeChild(mountNode.firstChild);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // @ts-ignore
      mountNode?.removeChild(mountNode?.firstChild);
      return;
    }
      mountNode?.appendChild(modalWrapper);
      onOpen && onOpen();
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
};

export default Modal;

