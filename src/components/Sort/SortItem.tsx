import React from 'react';

interface SortItemInstance {
  title: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SortItem = ({ title, className, onClick }: SortItemInstance) => {
  return (
    <li className={className}>
      <button onClick={onClick}>{title}</button>
    </li>
  );
};

export default SortItem;
