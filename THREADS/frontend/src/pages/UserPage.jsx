import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {


    return(
        <>
        <UserHeader />
        <UserPost likes={1200} replies={450} postImg = "/cr7.png" postTitle="threads" />
        <UserPost likes={100} replies={500} postImg = "/cr7.png" postTitle="ok" />
        <UserPost likes={10200} replies={4050} postImg = "/cr7.png" postTitle="working" />
        <UserPost likes={12000} replies={4900}  postTitle="fine" />

        </>
    )
}

export default UserPage