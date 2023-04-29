import React, { useState } from 'react'
import {Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast} from '@chakra-ui/react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom';
import ChatLoading from '../ChatLoading';
import axios from 'axios'
import UserListItem from '../useravatar/UserListItem';

const SideDrawer = () => {
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState()
  const toast = useToast();
  const { user } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSearch = async ()=>{
    if(!search){
      toast({
        title:"Please Enter something in search",
        status:"warning",
        duration:5000,
        isClosable: true,
        position : "top-left"
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`/api/user?search=${search}`,config)  
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      setLoading(false);
      return;
    }
  };

  const accessChat = (UserId)=>{

  }

  const logoutHandler=()=>{
    localStorage.removeItem("userInfo");
    history.push('/');
  }
  return (
    <>
     <Box
      display="flex"
      justifyContent={"space-between"}
      alignItems={'center'}
      bg="white"
      w="100%"
      p={"5px 10px 5px 10px"}
      borderWidth={"5px"}
     >
        <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{base:"none",md:"flex"}} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={'2xl'} fontFamily={"Work sans"}>Chatters</Text>
        <div>
          <Menu>
            <MenuButton p={1} >
              <BellIcon fontSize={'2xl'} m={1}/>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} >
             <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
     </Box>
     <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth={'1px'}>Search User</DrawerHeader>
        <DrawerBody>
          <Box display={'flex'} pb={2}>
            <Input
              placeholder='Search User '
              mr={2}
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button 
            onClick={handleSearch}
            >Go</Button>
          </Box>
          {loading?(
            <ChatLoading/>
          ):(
            searchResult?.map(user=>(
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
              />
            ))
          )}
        </DrawerBody>
      </DrawerContent>
     </Drawer>
    </>
  )
}

export default SideDrawer
