import { List } from '@material-ui/core';
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

interface Props {
  children: React.ReactNode;
  className: string;
}

const SortableList = SortableContainer(({ children, className }: Props) => {
  return (
    <List dense className={className}>
      {children}
    </List>
  );
});

export default SortableList;
