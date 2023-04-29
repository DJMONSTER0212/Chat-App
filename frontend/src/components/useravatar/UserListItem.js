import React from 'react'
// import { ChatState } from '../../Context/ChatProvider'
import {Avatar, Box, Text} from '@chakra-ui/react'
const UserListItem = ({ user,handleFunction}) => {
    // const {user} = ChatState();
  return (
    <div>
      <Box
        onClick={handleFunction}
        cursor={'pointer'}
        bg={"#E8E8E8"}
        _hover={{
          background:"#3882AC",
          color:"white"
        }}
        w="100%"
        display={"flex"}
        alignItems={"center"}
        color={"black"}
        px={3}
        py={2}
        mb={2}
        borderRadius={"lg"}
      >
        <Avatar
        mr={2}
        size={"sm"}
        cursor={'pointer'}
        name={user.name}
          src="https://c4.wallpaperflare.com/wallpaper/695/929/222/women-curvy-lana-rhoades-blue-eyes-wallpaper-preview.jpg"
        />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize="xs">
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    </div>
  )
}

export default UserListItem
