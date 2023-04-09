import React from 'react';

interface SortItemInstance {
  value: number;
  title: string;
}

const SortItem = ({ value, title }: SortItemInstance) => {
  return <option value={value}>{title}</option>;
};

export default SortItem;
