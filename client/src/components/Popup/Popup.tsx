import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './Popup.module.scss';

interface IPopupProps {
  children: ReactNode;
}

const Popup = ({ children }: IPopupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isOpen
    ? createPortal(<div className={styles.wrapper}>{children}</div>, document.body)
    : null;
};

export default Popup;
