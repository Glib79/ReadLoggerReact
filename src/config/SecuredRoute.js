import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from "prop-types";

const SecuredRoute = ({component, path, user}) => {
  if (!user.token) {
    return <Redirect push to="/login" />
  }
  
  return (<Route exact path={path} component={component}/>);
}

SecuredRoute.propTypes = {
  component: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};
          
const mapStateToProps = (state, props) => {
    return {
      user: state.user,
      component: props.component,
      path: props.path
    }
}
          
export default connect(mapStateToProps)(SecuredRoute);