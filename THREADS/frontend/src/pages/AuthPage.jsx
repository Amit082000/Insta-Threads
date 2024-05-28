import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";
import authScreenAtom from "../atoms/authAtom";

export const AuthPage = () => {

    const authScreenState = useRecoilValue(authScreenAtom);

    useSetRecoilState(authScreenAtom);

  return (
    <>
    {authScreenState === "login" ? <LoginCard /> : <SignupCard />}

    </>
  )
}

export default AuthPage;
