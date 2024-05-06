import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { Comment } from "../components/Comment"

const PostPage = () => {
    const[liked, setLiked] = useState(false);


    return(
        <>
        <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
            <Avatar src='/cr7.png' size="md" name="cr7" />
            <Flex>
                <Text fontSize={"sm"} fontWeight={"bold"}> Cristiano Ronaldo</Text>
                <Image  src ='/verified.png' w="4" h="4" ml="4" />
            </Flex>
        </Flex>

        <Flex gap="4" alignItems={"center"}>
            <Text fontSize={"sm"} color={"gray.light"}> 1d </Text>
            <BsThreeDots />
        </Flex>
        </Flex>

        <Text my="3" > Threads </Text>
        <Box
                borderRadius={6}
                overflow={"hidden"} 
                border ={"1px solid "}
                borderColor={"gray.light"}>
                    <Image src="/cr7.png" w={'full'} />
                    
        </Box>

        <Flex gap="3" mw="3">
            <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        <Flex gap="2" alignItems={"center"}>
            <Text color={"gray.light"} fontSize="sm"> 4m replies </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.dark"}></Box>
            <Text color={"gray.light"} fontSize="sm"> 
            {200 + (liked ? 1 : 0)} Likes
             </Text>       
         </Flex>

         <Divider my="4" />
         <Flex justifyContent={"space-between"}>
            <Flex gap="2" alignItems={"center"} > 
            <Text fontSize={"2xl"}> 🤝 </Text> 
            <Text color={"gray.light"} > get the app to like  reply and post</Text>
            </Flex>
            <Button >GET </Button>
         </Flex>
         <Divider my={4} />
         <Comment
          comments="looks good"
           createdAt="2d"
            likes={100}
            userName = 'Kent Dodds' 
            src ='https://bit.ly/kent-c-dodds'
              />
         <Comment
          comments="working good"
           createdAt="5d"
            likes={300}
            userName = 'Ryan Florence' 
            src ='https://bit.ly/ryan-florence' 
              />
         <Comment
          comments="done with this "
           createdAt="1d"
            likes={150}
            userName = 'Christian Nwamba' 
            src ='https://bit.ly/code-beast'
              />


        </>
    )
}

export default PostPage