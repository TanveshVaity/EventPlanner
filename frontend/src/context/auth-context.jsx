import { createContext, useContext } from 'react';

const AuthContext = createContext({
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
