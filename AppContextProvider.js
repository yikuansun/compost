
import React, { Component } from "react";

// Refer to example: https://www.taniarascia.com/using-context-api-in-react/
export const AppContext = React.createContext();

class AppContextProvider extends Component {


    state = {
        user: {
            loggedIn: false,
            userInfo: {
                user_id: '',
            },
        }
    }

    setUser = (user) => {
        this.setState((previousState) => ({user}));
    }

    render() {
        const {children} = this.props
        const {user} = this.state
        const { setUser } = this;
        return (
            <AppContext.Provider
                value={{
                  user,
                  setUser,
                }}
            >
                {children}  
            </AppContext.Provider>
        )
    }
}

export default AppContext;

export { AppContextProvider };
