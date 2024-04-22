import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast, VStack } from "@chakra-ui/react";
import {BsInstagram} from "react-icons/bs";
import {CgMoreO} from "react-icons/cg";

const UserHeader = () => {

    const toast = useToast();


    const copyUrl = () => {

        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast({ description: 'url copied',
              isClosable: true

             })
        })

    }


    return(
        <VStack gap={4} alignItems={"start"} >
            <Flex justifyContent={"space-between"} w={"full"} >

           
              <Box>
                <Text fontSize={  {
                    base: "md",
                    md:"xl"
                  } } fontWeight={"bold"}  >
                    Cristiano Ronaldo
                </Text>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"sm"}> cr7 </Text>
                    <Text fontSize={"xs"} 
                    bg={"gray.light"}
                    color={"gray.dark"} borderRadius={"full"} > threads.net </Text>
                </Flex>
                </Box> 
              
              <Box> 
                <Avatar 
                name="Cristiano Ronaldo"
                src="cr7.png"
                size={{
                  base: "md",
                  md:"xl"


                }} />
                 </Box>
            </Flex>
            <Text fontSize={"m"} >
                Proffesional Footballer, partime Influencer
            </Text>
            <Flex w={"full"} justifyContent={"space-between"} >  
              <Flex gap={2} alignItems={"center"} >
                <Text color={"gray.light"} > 50m followers </Text>
                <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"} ></Box>
                <Link color={"gray.light"} > instagram.com </Link>

              </Flex>
              <Flex>
              <Box className="icon-container">
                <BsInstagram size={24} cursor={"pointer"} />
              </Box>
    
              <Box className="icon-container">
                <Menu>
                <MenuButton> 
                   <CgMoreO size={24} cursor={"pointer"} />

                </MenuButton>
                <Portal>
                <MenuList bg={"gray.light"}  >
                   <MenuItem bg={"gray.light"} onClick = {copyUrl} >copy link</MenuItem>
                </MenuList>
                </Portal>
                </Menu>
              </Box>
              </Flex>
            </Flex>
            <Flex w={"full"} >
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent="center" pb="3" cursor={"pointer"} > 
                <Text fontWeight={"bold"}> Threads </Text>
                 </Flex>
                 <Flex flex={1} borderBottom={"1px solid grey"} justifyContent="center" pb="3" color={"gray.light"} cursor={"pointer"} > 
                <Text fontWeight={"bold"}> Replies </Text>
                 </Flex>            </Flex>
        </VStack>
    )
}

export default UserHeader