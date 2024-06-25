/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState, createContext, useRef } from "react";
import { auth } from "../config/firebase";
import { User } from "firebase/auth";
import Loading from "../components/Loading";

const AUTH_URL = 'http://localhost:3001/api/v0/auth';

interface AuthContextType {
    isAuthenticated: boolean,
    isStylist: boolean;
    authUser: User | null | undefined;
    authToken: string,
    defineUserType: (type: 'client' | 'stylist') => void
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isStylist: false,
    authUser: null,
    authToken: '',
    defineUserType: () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

interface AuthContextProps {
    children: React.ReactNode;
}

const signAuth = async (token: string) => {
    const response = await fetch(`${AUTH_URL}/sign/stylist`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
}

export function AuthProvider({ children }: AuthContextProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isStylist, setIsStylist] = useState(false);
    const [authUser, setAuthUser] = useState<User | null>();
    const [authToken, setAuthToken] = useState('');
    const [loading, setLoading] = useState(true);
    const userTypeRef = useRef('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(onAuthUser);
        return unsubscribe;
    }, []);

    async function onAuthUser(user: User | null) {
        try {
            setLoading(true);
            setAuthUser(user);
            setIsAuthenticated(user !== null);
            await initializeUser(user);
        } catch (error) {
            console.log('Initialize user error', error);
        } finally {
            setLoading(false);
        }
    }

    const initializeUser = async (user: User | null | undefined) => {
        if (user) {
            let tokenResult = await user.getIdTokenResult(true);
            
            if (userTypeRef.current === 'stylist' && !tokenResult.claims.stylist) {
                await signAuth(tokenResult.token);
                tokenResult = await user.getIdTokenResult(true);
            }

            const { claims, token } = tokenResult;
            console.log(token);
            setIsStylist(claims.stylist as boolean);
            setAuthToken(token);
        } else {
            setAuthToken('');
        }
    }

    const defineUserType = (type: 'client' | 'stylist') => {
        userTypeRef.current = type
    }

    const value = { 
        authUser, 
        authToken,
        isStylist,
        isAuthenticated,
        defineUserType
    };

    return (
        <AuthContext.Provider value={value}>
            { loading ? <Loading /> : children }
        </AuthContext.Provider>
    )
}
    