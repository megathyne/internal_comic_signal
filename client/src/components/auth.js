import React, { Component, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        localStorage.removeItem('accessToken')
        this.props.history.push('/login');
      }
    }

    componentDidUpdate(nextProps) {
      if (!nextProps.authenticated) {
        localStorage.removeItem('accessToken')
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authReducer.authenticated };
  }

  return connect(mapStateToProps, null)(Authentication);
}



// export default function Auth(ComposedComponent) {
//   const authenticated = useSelector(state => state.authReducer.authentication)
//   const history = useSelector(state => state.history)
//   console.log('here')

//   useEffect(() => {
//     if (authenticated) {
//       history.push('/login')
//     }
//   }, [authenticated])


//   useEffect(() => {
//     if (!authenticated) {
//       history.push('/login')
//     }
//   }, [authenticated])

//   return <ComposedComponent {...this.props} />;
// }
