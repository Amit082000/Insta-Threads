import { Button, Toast } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";


export const LogoutButton = () => {

    const setUser =  useSetRecoilState(userAtom);
    const showToast = useShowToast();


    const handleLogout = async() => {

    
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                }  ,             
            })
            const data = await res.json();
            if(data.error){
                showToast("Error", data.error, "error");
                return;
            }
            localStorage.removeItem("user-threads");
            setUser(null);


        } catch(err){
            showToast("Error", err, "error");
        }

    }

    return (
    <Button 
    position={"fixed" }
    top={"30px"}
    right={"30px"}
    size={"sm"}
    onClick={handleLogout} > <FiLogOut size={20} />
    </Button>
  )
}
