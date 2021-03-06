import React from 'react'
import { array, bool, object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import GroupCards from 'components/IndexScene/GroupCards'
import Loading from 'components/Loading'
import connector from './connector'

const styles = () => ({
  root: {
    paddingTop: 30,
  },
})

class IndexScene extends React.Component {
  componentDidMount() {
    const { actions } = this.props
    actions.layout.background('/images/Blowing.jpg')
    document.title = 'MyTrello'

    actions.groupCard.load()
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.layout.removeBackground()
  }

  render() {
    const { classes, auth: { user }, loading, groupCard } = this.props
    if (loading) return <Loading />

    return (
      <div className={classes.root}>
        <GroupCards user={user} groupCard={groupCard} />
      </div>
    )
  }
}

IndexScene.propTypes = {
  classes: object.isRequired,
  auth: object.isRequired,
  actions: object.isRequired,
  loading: bool.isRequired,
  groupCard: array.isRequired,
}

export default withStyles(styles)(connector(IndexScene))
