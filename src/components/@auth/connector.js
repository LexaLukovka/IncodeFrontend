import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as auth from 'src/redux/auth/action'
import layout from 'src/redux/layout/action'
import dialog from 'src/redux/dialogAuth/action'

const initMapStateToProps = store => ({
  auth: store.authReducer,
  layout: store.layoutReducer,
  dialogLogin: store.dialogAuthReducer.dialogLogin,
  dialogRegister: store.dialogAuthReducer.dialogRegister,
})

const initMapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(auth, dispatch),
    layout: bindActionCreators(layout, dispatch),
    dialog: bindActionCreators(dialog, dispatch),
  },
})

export default connect(initMapStateToProps, initMapDispatchToProps)
