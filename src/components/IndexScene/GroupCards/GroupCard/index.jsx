/* eslint-disable no-underscore-dangle */
import React from 'react'
import { array, object, string } from 'prop-types'
import { Card, CardContent, CardHeader, IconButton, Typography, withStyles } from '@material-ui/core'
import DeleteIcon from 'mdi-react/DeleteIcon'
import CreateGroupTask from './CreateGroupTask'
import ClickAddTask from './ClickAddTask'
import Task from './Task'
import connector from './connector'

const styles = () => ({
  root: {
    minWidth: 300,
    maxWidth: 400,
    height: '100%',
    margin: '0 10px 30px',
    background: 'rgba(225, 225, 225, 0.8)',
  },
  title: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  content: {
    padding: 10,
  },
})

class GroupCard extends React.Component {
  handleOpenInput = (groupId) => {
    const { actions } = this.props
    actions.task.openOneTask(groupId)
  }

  handleCloseInput = () => {
    const { actions } = this.props
    actions.task.closeOneTask()
  }

  handleDeleteGroupCard = (groupId) => {
    const { actions } = this.props
    actions.group.deleteGroup(groupId)
  }

  render() {
    const { classes, user, title, tasks, groupId, openTask: { openId } } = this.props

    return (
      <Card className={classes.root}>
        <CardHeader
          className={classes.title}
          title={<Typography variant="subheading">{title}</Typography>}
          action={user && <IconButton onClick={() => this.handleDeleteGroupCard(groupId)}><DeleteIcon /></IconButton>}
        />
        <CardContent className={classes.content}>
          {user &&
          <React.Fragment>
            {
              openId === groupId ?
                <CreateGroupTask groupId={groupId} closeInput={this.handleCloseInput} />
                :
                <ClickAddTask openInput={() => this.handleOpenInput(groupId)} />
            }
          </React.Fragment>
          }
          {tasks.map(task => <Task key={task._id} groupId={groupId} task={task} />)}
        </CardContent>
      </Card>
    )
  }
}

GroupCard.propTypes = {
  classes: object.isRequired,
  user: object,
  actions: object.isRequired,
  title: string.isRequired,
  groupId: string.isRequired,
  openTask: object.isRequired,
  tasks: array.isRequired,
}

GroupCard.defaultProps = {
  user: null,
}

export default withStyles(styles)(connector(GroupCard))
