import { Button, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const HomePage = () => {
  return (
    <Link to={"/cr7"}>
        <Flex w={"full"} justifyContent={"center"}>
            <Button mx="auto">Profile</Button>
        
        </Flex>
    </Link>
  )
}

export default HomePage;
