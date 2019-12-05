import { Box, Chip, Collapse, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { TaskEntity, TaskStatusEntity } from 'models/entities';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import ListItem from '@material-ui/core/ListItem';
import { ManagableListInjectedProps } from 'shared/hoc/ManagableList';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'flex-start',
      padding: theme.spacing(1.5, 1, 0, 2.5),
      borderBottom: `1px solid ${theme.palette.grey[400]}`
    },

    header: {
      display: 'flex',
      width: '100%',
      marginBottom: theme.spacing(1)
    },

    toolbox: {
      marginLeft: 'auto'
    },

    taskStatusWrapper: {
      width: 0
    },

    taskStatus: {
      margin: '5px 0 0 auto'
    },

    blankTaskStatus: {
      color: theme.palette.grey[500]
    },

    rotated: {
      transform: 'rotate(180deg)'
    },

    menuItem: {
      '& svg': {
        marginRight: theme.spacing(1.5),
        width: '22px',
        height: '22px',

        '&:last-of-type': {
          transform: 'translateY(-1.5px)'
        }
      }
    }
  })
);

interface Props extends ManagableListInjectedProps {
  index: number;
  task: TaskEntity;
  taskStatus?: TaskStatusEntity | null;
  onEditTaskClick(task: TaskEntity): void;
  onDeleteTaskClick(task: TaskEntity): void;
  onTaskStatusClick(task: TaskEntity): void;
}

const TaskListItem = SortableElement(
  ({
    task,
    taskStatus,
    areDetailsOpen,
    isMenuOpen,
    menuAnchor,
    onEditTaskClick,
    onDeleteTaskClick,
    onTaskStatusClick,
    toggleDetails = () => {},
    openMenu = () => {},
    closeMenu = () => {}
  }: Props) => {
    const classes = useStyles();

    return (
      <ListItem className={classes.root} style={task.theme}>
        <Box className={classes.header}>
          <Box>
            <Typography variant='caption'>{task.creationDate}</Typography>
            <Typography variant='subtitle2'>{task.name}</Typography>
            <Box className={classes.taskStatusWrapper} onClick={() => onTaskStatusClick(task)}>
              {taskStatus ? (
                <Chip clickable size='small' label={taskStatus.name} style={taskStatus.theme} className={classes.taskStatus} />
              ) : (
                <Chip clickable size='small' label='No status' className={`${classes.taskStatus} ${classes.blankTaskStatus}`} />
              )}
            </Box>
          </Box>

          <Box className={classes.toolbox}>
            {task.description && (
              <IconButton
                aria-label='show more'
                className={areDetailsOpen ? classes.rotated : ''}
                onClick={() => toggleDetails(task.id)}
              >
                <ExpandMoreIcon />
              </IconButton>
            )}

            <IconButton aria-label='delete' onClick={e => openMenu(e, task.id)}>
              <MoreIcon fontSize='inherit' />
            </IconButton>
          </Box>
        </Box>

        <Collapse in={areDetailsOpen} timeout='auto' unmountOnExit>
          <Typography paragraph>{task.description}</Typography>
        </Collapse>

        {isMenuOpen && (
          <Menu anchorEl={menuAnchor} keepMounted open onClose={closeMenu} TransitionComponent={Fade}>
            <MenuItem
              className={classes.menuItem}
              onClick={() => {
                onEditTaskClick(task);
                closeMenu();
              }}
            >
              <EditIcon />
              <Typography variant='button'>Edit</Typography>
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => {
                onDeleteTaskClick(task);
                closeMenu();
              }}
            >
              <DeleteIcon />
              <Typography variant='button'>Remove</Typography>
            </MenuItem>
          </Menu>
        )}
      </ListItem>
    );
  }
);

export default TaskListItem;
