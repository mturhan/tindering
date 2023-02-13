import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});
const config = {
  iosClientId:
    "249573038266-0ap5pr5g3t02ft3evdu0uoq1ho2s3si8.apps.googleusercontent.com",
  androidClientId:
    "249573038266-qjcjokngpe7o0iqdnvnrjsra6mhkk8vb.apps.googleusercontent.com",
  expoClientId:
    "249573038266-urtgs6nidmctqisb069emvi3fhbaekmk.apps.googleusercontent.com",
  scope: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};
export const AuthProvider = ({ children }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        user ? setUser(user) : setUser(null);
        setLoadingInitial(false);
      }),
    []
  );

  const signInWithGoogle = async () => {
    setLoading(true);
    await promptAsync()
      .then(async () => {
        if (response.type === "success") {
          const idToken = response.params.id_token;
          const credential = GoogleAuthProvider.credential(idToken);

          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValues = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logOut,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValues}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
