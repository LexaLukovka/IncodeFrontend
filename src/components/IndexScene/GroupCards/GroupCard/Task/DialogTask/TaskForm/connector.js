import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as group from 'src/redux/groupCard/action'
import * as task from 'src/redux/task/action'

const initMapStateToProps = store => ({
  currentTask: store.groupCardReducer.currentTask,
  currentGroup: store.groupCardReducer.currentGroup,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    groupCard: bindActionCreators(group, dispatch),
    task: bindActionCreators(task, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
