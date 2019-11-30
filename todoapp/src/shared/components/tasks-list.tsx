import { Box, Collapse, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
  SortableHandle as sortableHandle
} from 'react-sortable-hoc';

import DragIcon from '@material-ui/icons/OpenWith';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import { TaskEntity } from 'models/entities';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '0 3px 6px rgba(0,0,0,.14)',
      padding: 0
    },

    task: {
      position: 'relative',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'flex-start',
      padding: theme.spacing(1.5, 2.5, 1.5, 2.5),
      borderBottom: `1px solid ${theme.palette.grey[400]}`
    },

    mainContent: {
      maxWidth: '84%'
    },

    moreBtn: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: '36px',
      height: '36px',
      zIndex: 2,

      '& svg': {
        transform: 'translateY(-5px)'
      }
    },

    dragBtn: {
      position: 'absolute',
      top: 5,
      right: 40,
      width: '36px',
      height: '36px',

      '& svg': {
        transform: 'translateY(-5px)',
        width: '20px',
        height: '20px'
      }
    },

    expandBtn: {
      position: 'absolute',
      top: 5,
      right: 75,
      width: '36px',
      height: '36px',
      zIndex: 1,
      transition: '0.3s transform',
      transform: 'rotate(0)',

      '& svg': {
        transform: 'translateY(-5px)'
      }
    },

    rotated: {
      transform: 'rotate(180deg)'
    }
  })
);

interface DragHandleProps {
  classes: Record<any, string>;
}

const DragHandle = sortableHandle(({ classes }: DragHandleProps) => (
  <IconButton aria-label='drag' className={classes.dragBtn}>
    <DragIcon fontSize='inherit' />
  </IconButton>
));

interface SortableItemProps {
  menuData: { anchor?: null | HTMLElement; task?: TaskEntity };
  value: TaskEntity;
  classes: Record<any, string>;
  isExpanded: boolean;
  openMenu(e: React.MouseEvent<HTMLElement>, task: TaskEntity): void;
  handleEditClick(): void;
  handleRemoveClick(): void;
  closeMenu(): void;
  toggleItemExpansion(id: number): void;
}

const SortableItem = sortableElement(
  ({
    value: task,
    classes,
    isExpanded,
    openMenu,
    menuData,
    closeMenu,
    handleEditClick,
    handleRemoveClick,
    toggleItemExpansion
  }: SortableItemProps) => (
    <ListItem key={task.id} className={classes.task} style={{ color: task.theme.color, background: task.theme.background }}>
      <Box className={classes.mainContent}>
        <Typography variant='caption'>{task.creationDate}</Typography>
        <Typography variant='subtitle2'>{task.name}</Typography>
      </Box>

      <Collapse in={isExpanded} timeout='auto' unmountOnExit>
        <Typography className={classes.taskDetails} paragraph>
          {task.description}
        </Typography>
      </Collapse>

      <DragHandle classes={classes} />

      <IconButton aria-label='delete' className={classes.moreBtn} onClick={e => openMenu(e, task)}>
        <MoreIcon fontSize='inherit' />
      </IconButton>

      {task.description && (
        <IconButton
          className={`${classes.expandBtn} ${isExpanded ? classes.rotated : ''}`}
          aria-label='show more'
          onClick={() => toggleItemExpansion(task.id)}
        >
          <ExpandMoreIcon />
        </IconButton>
      )}

      {menuData.task && menuData.task.id === task.id && Boolean(menuData.anchor) && (
        <Menu id='fade-menu' anchorEl={menuData.anchor} keepMounted open onClose={closeMenu} TransitionComponent={Fade}>
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={handleRemoveClick}>Remove</MenuItem>
        </Menu>
      )}
    </ListItem>
  )
);

interface SortableContainerProps {
  children: React.ReactNode;
  classes: Record<any, string>;
}

const SortableContainer = sortableContainer(({ children, classes }: SortableContainerProps) => {
  return (
    <List dense className={classes.root}>
      {children}
    </List>
  );
});

interface Props {
  tasks: TaskEntity[];
  onEditTask(task: TaskEntity): void;
  onRemoveTask(task: TaskEntity): void;
  onSortEnd(indexes: { oldIndex: number; newIndex: number }): void;
}

const TasksList = ({ tasks, onEditTask, onRemoveTask, onSortEnd }: Props) => {
  const classes = useStyles();

  const [menuData, setMenuData] = useState<{ anchor?: null | HTMLElement; task?: TaskEntity }>({});

  const [expandedItems, setExpandedItems] = useState<{ [id: number]: boolean }>({});

  const openMenu = (e: React.MouseEvent<HTMLElement>, task: TaskEntity) => {
    setMenuData({ anchor: e.currentTarget, task });
  };

  const closeMenu = () => {
    setMenuData({});
  };

  const handleEditClick = () => {
    onEditTask(menuData.task!);
    closeMenu();
  };

  const handleRemoveClick = () => {
    onRemoveTask(menuData.task!);
    closeMenu();
  };

  const toggleItemExpansion = (id: number) => {
    setExpandedItems({ ...expandedItems, [id]: expandedItems[id] ? false : true });
  };

  return (
    <SortableContainer onSortEnd={onSortEnd} distance={1} classes={classes}>
      {tasks.map((task, idx) => (
        <SortableItem
          key={task.id}
          index={idx}
          value={task}
          classes={classes}
          menuData={menuData}
          closeMenu={closeMenu}
          openMenu={openMenu}
          isExpanded={expandedItems[task.id] ? true : false}
          handleEditClick={handleEditClick}
          handleRemoveClick={handleRemoveClick}
          toggleItemExpansion={toggleItemExpansion}
        />
      ))}
    </SortableContainer>
  );
};

export default TasksList;
