/* eslint-disable */
import React, { FunctionComponent, useRef, useEffect } from 'react';
import classnames from 'classnames';
import Portal from '../Portal';
import * as style from './Modal.module.scss';

type ModalContentProps = {
  isOpen: boolean;
  parentMounted?: boolean;
  onClose?: () => void;
  mountOn: Element;
};

const ModalContent: FunctionComponent<ModalContentProps> = ({
  isOpen,
  parentMounted,
  onClose,
  children,
  mountOn,
}) => {
  const className = classnames(
    // @ts-ignore
    [style.modal], { modal: true, [style.open]: isOpen, [style.close]: parentMounted === false ? undefined : !isOpen,
  });

  const ref: any = useRef();

  function handleClickOutside(e) {
    if (ref.current && !ref?.current?.contains(e.target)) {
      onClose && onClose();
      console.log('outside')
    }
  }

  useEffect(() => {
    if (isOpen) window.addEventListener('mousedown', handleClickOutside);
    return () => { if (isOpen) window.removeEventListener('mousedown', handleClickOutside) };
  }, [ref, isOpen, onClose]);

  return (
    <Portal mountOn={mountOn}>
      <div className={className}>
        <button onClick={onClose}>close</button>
        <div ref={ref}
          //@ts-ignore
          className={style.modalBody}
        >{children}</div>
      </div>
    </Portal>
  );
};

export default ModalContent;
