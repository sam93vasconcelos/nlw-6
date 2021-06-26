import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { firebase, auth } from "../services/firebase";

export const AuthContext = createContext({} as AuthContext);

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContext = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderTypes = {
  children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderTypes) {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL) {
          throw new Error("Missing information from google account");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    })

    return () =>{
      unsubscribe();
    }
  }, []);

  const [user, setUser] = useState<User>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if(result.user) {
      const { displayName, photoURL, uid } = result.user;

      if(!displayName || !photoURL) {
        throw new Error("Missing information from google account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { props.children }
    </AuthContext.Provider>
  )
}