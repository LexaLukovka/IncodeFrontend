/* eslint-disable no-underscore-dangle */
import React from 'react'
import { number, object, string } from 'prop-types'
import { Card, withStyles } from '@material-ui/core'

import { Draggable } from 'react-beautiful-dnd'

import ViewTask from './ViewTask'
import DialogTask from './DialogTask'
import TaskUpdateForm from './TaskUpdateForm'

import DialogLogin from 'components/@auth/Dialog/DialogLogin'
import DialogRegister from 'components/@auth/Dialog/DialogRegister'

import connector from './connector'

const styles = () => ({
  root: {
    padding: '5px 20px',
    margin: '10px 0',
  },
})

class Task extends React.Component {
  handleOpenDetails = (groupId, taskId) => {
    const { actions, auth } = this.props
    if (auth.user) {
      actions.group.currentTask({ groupId, taskId })
      actions.taskOpen.openDetailsTask(taskId)
      actions.taskOpenUpdate.closeUpdateTask()
    } else {
      actions.dialog.openDialogLogin()
    }
  }

  handleCloseDetails = () => {
    const { actions } = this.props
    actions.taskOpen.closeDetailsTask()
  }

  handleOpenRefactor = (groupId, taskId) => {
    const { actions } = this.props
    actions.group.currentTask({ groupId, taskId })
    actions.taskOpenUpdate.openUpdateTask(taskId)
  }

  handleCloseRefactor = () => {
    const { actions } = this.props
    actions.taskOpenUpdate.closeUpdateTask()
  }

  handleDelete = async (groupId, taskId) => {
    const { actions } = this.props
    await actions.task.deleteTask(groupId, taskId)
    actions.taskOpenUpdate.closeUpdateTask()
  }

  render() {
    const {
      classes,
      auth: { user },
      currentGroup,
      currentTask,
      groupId,
      task,
      index,
      openRefactor,
      openDetails,
    } = this.props

    return (
      <Draggable draggableId={task._id} index={index}>
        {(provided) =>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card className={classes.root}>
              {
                task._id === openRefactor ?
                  <TaskUpdateForm
                    user={user}
                    onCloseReafactor={this.handleCloseRefactor}
                    onDelete={() => this.handleDelete(groupId, task._id)}
                  />
                  :
                  <ViewTask
                    user={user}
                    task={task}
                    clickOpenRefactor={() => this.handleOpenRefactor(groupId, task._id)}
                    clickOpenDetails={() => this.handleOpenDetails(groupId, task._id)}
                  />
              }
              {user ?
                <DialogTask
                  task={task}
                  currentGroup={currentGroup}
                  currentTask={currentTask}
                  isOpen={task._id === openDetails}
                  onClose={this.handleCloseDetails}
                  onDelete={() => this.handleDelete(groupId, task._id)}
                />
                :
                <React.Fragment>
                  <DialogLogin />
                  <DialogRegister />
                </React.Fragment>
              }
            </Card>
          </div>
        }
      </Draggable>
    )
  }
}


Task.propTypes = {
  classes: object.isRequired,
  auth: object.isRequired,
  actions: object.isRequired,
  currentGroup: object.isRequired,
  currentTask: object.isRequired,
  groupId: string.isRequired,
  task: object.isRequired,
  index: number.isRequired,
  openRefactor: string,
  openDetails: string,
}

Task.defaultProps = {
  openRefactor: null,
  openDetails: null,
}

export default withStyles(styles)(connector(Task))
