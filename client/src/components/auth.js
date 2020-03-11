import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// export default function(ComposedComponent) {
//   class Authentication extends Component {
//     componentDidMount() {
//       if (!this.props.authenticated) {
//         localStorage.removeItem('accessToken');
//         this.props.history.push('/login');
//       }
//     }

//     componentDidUpdate(nextProps) {
//       if (!nextProps.authenticated) {
//         localStorage.removeItem('accessToken');
//         this.props.history.push('/login');
//       }
//     }

//     render() {
//       return <ComposedComponent {...this.props} />;
//     }
//   }

//   function mapStateToProps(state) {
//     return { authenticated: state.authReducer.authenticated };
//   }

//   return connect(mapStateToProps, null)(Authentication);
// }

function Auth({ component: Component, ...rest }) {
  const authenticated = useSelector(state => state.authReducer.authenticated);
  return <Route {...rest} render={props => (authenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
}
export default Auth;
