import React, { useState } from 'react';

export interface ManagableListInjectedProps {
  areDetailsOpen?: boolean;
  isMenuOpen?: boolean;
  menuAnchor?: HTMLElement | null;
  toggleDetails?(id: number): void;
  openMenu?(e: React.MouseEvent<HTMLElement>, id: number): void;
  closeMenu?(): void;
}

const ManagableList: React.FC = ({ children }) => {
  const [openedMenu, setOpenedMenu] = useState<{ anchor: null | HTMLElement; id: number }>({ anchor: null, id: -1 });
  const [expandedItems, setExpandedItems] = useState<{ [id: number]: boolean }>({});

  const renderEnhancedChildrens = () => {
    return React.Children.map(children, (child, idx) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          areDetailsOpen: expandedItems[child.props.task.id] ? true : false,
          isMenuOpen: openedMenu.id === child.props.task.id,
          menuAnchor: openedMenu.anchor,
          toggleDetails: (id: number) => setExpandedItems({ ...expandedItems, [id]: expandedItems[id] ? false : true }),
          openMenu: (e: React.MouseEvent<HTMLElement>, id: number) => setOpenedMenu({ anchor: e.currentTarget, id }),
          closeMenu: () => setOpenedMenu({ anchor: null, id: -1 })
        });
      }
    });
  };

  return <>{children && renderEnhancedChildrens()}</>;
};

export default ManagableList;
