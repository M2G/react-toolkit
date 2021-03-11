/* eslint-disable */
import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import Portal from '../Portal';
import style from './Modal.module.scss';

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
  const className = classnames({
    modal: true,
    // @ts-ignore
    [style.open]: isOpen,
    // @ts-ignore
    [style.close]: parentMounted === false ? undefined : !isOpen,
  });

  return (
    <Portal mountOn={mountOn}>
      <div className={className}>
        <button onClick={onClose}>close</button>
        <div
          //@ts-ignore
          className={style.modalBody}
        >{children}</div>
      </div>
    </Portal>
  );
};

export default ModalContent;
