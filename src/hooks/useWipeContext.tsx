import useAuth from "./useAuth";

const useWipeContext = () => {
  const { setAuth } = useAuth();

  const wipeContext = () => {
    localStorage.removeItem('auth');
    setAuth(null);
  }

  return wipeContext;
}

export default useWipeContext