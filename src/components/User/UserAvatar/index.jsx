import React, { Component } from 'react'
import { bool, object, shape, string } from 'prop-types'
import { Avatar, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import initialsFromUsername from 'utils/initialsFromUsername'

const styles = theme => ({
  root: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    [theme.breakpoints.up('sm')]: {
      width: 120,
      height: 120,
    },
  },
  small: {
    width: 40,
    fontSize: 20,
    height: 40,
  },
})

class UserAvatar extends Component {
  overrides = () => {
    const { classes, small } = this.props
    return classNames({
      [classes.root]: true,
      [classes.small]: small,
    })
  }

  render() {
    const { user } = this.props
    return (
      <Avatar className={this.overrides()} src={user.avatar_url}>
        {initialsFromUsername(user.name)}
      </Avatar>
    )
  }
}

UserAvatar.propTypes = {
  classes: object.isRequired,
  small: bool,
  user: shape({
    avatar_url: string,
    name: string,
  }).isRequired,
}

UserAvatar.defaultProps = {
  small: false,
}

export default withStyles(styles)(UserAvatar)
