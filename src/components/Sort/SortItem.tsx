import React from 'react';

interface SortItemInstance {
  name: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SortItem = ({ name, className, onClick }: SortItemInstance) => {
  return (
    <li className={className}>
      <button onClick={onClick}>{name}</button>
    </li>
  );
};

export default SortItem;
