import React from 'react'
import { func, object } from 'prop-types'
import { Card, Typography, withStyles } from '@material-ui/core'
import AddIcon from 'mdi-react/AddIcon'

const styles = () => ({
  root: {
    display: 'flex',
    padding: '5px 10px',
    opacity: 0.8,
  },
})
const ClickAddTask = ({ classes, openInput }) =>
  <Card className={classes.root} onClick={openInput}>
    <AddIcon style={{ alignSelf: 'center' }} />
    <Typography variant="body2">Добавить таску</Typography>
  </Card>

ClickAddTask.propTypes = {
  classes: object.isRequired,
  openInput: func.isRequired,
}

export default withStyles(styles)(ClickAddTask)
