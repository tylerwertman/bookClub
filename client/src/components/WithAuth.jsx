import React from 'react';
import Home from './Home';
import Cookies from 'js-cookie';


const withAuth = (Component) => {

    const cookieValue = Cookies.get('userToken');
    // console.log(cookieValue)

    let isAuthenticated

    if(cookieValue){
        isAuthenticated = true
    }else{
        isAuthenticated = false
    }

    return class extends React.Component {
        render() {
            if (isAuthenticated) {
                return <Component {...this.props} />;
            } else {
                return <Home />;
            }
        }
    };
};

export default withAuth;
