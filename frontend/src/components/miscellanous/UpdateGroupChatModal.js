import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../useravatar/UserBadgeItem'
import axios from 'axios'
import UserListItem from '../useravatar/UserListItem'

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName,setGroupChatName] = useState();
    const [search,setSearch] = useState("");
    const [searchReuslt,setSearchReuslt] = useState([]);
    const [loading,setLoading] = useState(false);
    const {selectedChat,setSelectedChat,user} = ChatState();
    const [renameLoading,setRenameLoading] = useState(false);
    const toast = useToast(); 
    const handleRemove = async (user1)=>{
        if (selectedChat.groupAdmin._id !== user._id &&user1._id!==user._id) {
            toast({
                title: "Only admins can remove someone!!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };
            const { data } = await axios.put('/api/chat/groupremove', {
                chatId: selectedChat._id,
                userId: user1._id,
            }, config);
            user1._id===user._id?setSelectedChat():setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    };
    const handleRename = async ()=>{
        if(!groupChatName)return ;
        try {
            setRenameLoading(true);
            const config={
                headers:{
                    Authorization :`Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put('/api/chat/rename',{
                chatId: selectedChat._id,
                chatName: groupChatName,
            },config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            })
            setRenameLoading(false);

        }
        setGroupChatName("");
    };
    const handleSearch = async (query) => {

        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data)
            setLoading(false);
            setSearchReuslt(data);

        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
            setLoading(false);
        }
    }
    const handleAddUser = async (user1)=>{
        if(selectedChat.users.find((u)=>u._id === user1._id)){
            toast({
                title:"User Already in group!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:'bottom',
            });
            return;
        }
        if(selectedChat.groupAdmin._id!== user._id){
            toast({
                title: "Only admins can add someone!!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }
        try {
            setLoading(true);
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                },
            };
            const {data} = await axios.put('/api/chat/groupadd',{
                chatId: selectedChat._id,
                userId: user1._id,
            },config);
            console.log(data);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                description:error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    };
    return (
        <>
            <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize={"35px"}
                        fontFamily={"Work sans"}
                        display={"flex"}
                        justifyContent={"center"}
                    >{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <Lorem  count={2} /> */}
                        <Box w="100%" display={"flex"} flexWrap={"wrap"} pb={3}> 
                            {selectedChat.users.map(u=>(
                                <UserBadgeItem key={user._id}
                                    user={u}
                                    handleFunction={() => handleRemove(u)}
                                /> 
                            ))}
                        </Box>
                        <FormControl display={'flex'}>
                            <Input
                                placeholder='Chat Name'
                                mb={3}
                                value={groupChatName}
                                onChange={(e)=>setGroupChatName(e.target.value)}
                            />
                            <Button
                            variant={"solid"}
                            colorScheme='teal'
                            ml={1}
                            isLoading={renameLoading}
                            onClick={handleRename}
                            >Update</Button>
                        </FormControl>
                        <FormControl display={'flex'}>
                            <Input
                                placeholder='Add users to group '
                                mb={1}
                                value={search}
                                onChange={(e)=>handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {loading?(<Spinner size={"lg"}/>):(
                            searchReuslt?.map((user)=>(
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={()=>handleAddUser(user)}
                                />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={()=>handleRemove(user)}>
                            Leave Group
                        </Button>   
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal
