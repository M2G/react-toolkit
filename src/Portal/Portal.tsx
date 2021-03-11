/* eslint-disable */
import { FunctionComponent, memo, useEffect, useRef, useState} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

type PortalProps = {
  id?: string | undefined;
  parentMounted?: boolean;
  children: JSX.Element;
  mountOn?: any;
};

const Portal: FunctionComponent<PortalProps> = ({ id, mountOn, children }) => {
  // @ts-ignore
  const el = useRef(mountOn || document.getElementById(id) ||document.createElement('div'));

  const [dynamic] = useState(!el.current.parentElement);
  useEffect(() => {
    if (dynamic) {
      // @ts-ignore
      el.current.id = id;
      document.body.appendChild(el.current);
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    };
  }, [id]);
  return createPortal(children, el.current);
};

export default memo(Portal);

Portal.displayName = 'Portal';

Portal.propTypes = {
  id: PropTypes.string,
  mountOn: PropTypes.any,
  children: PropTypes.element.isRequired
};
