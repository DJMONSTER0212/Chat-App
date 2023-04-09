import { Button, VStack } from '@chakra-ui/react'
import { Input, InputGroup ,InputRightElement} from '@chakra-ui/input'
import React, { useState } from 'react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
const Signup = () => {
    
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [pic, setpic] = useState("");
    const handleClick = ()=>setShow(!show)
    const postDetails = (pics)=>{ };
    const submitHandler =()=>{};
    return (
        <VStack spacing={"5px"} >
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>E-mail</FormLabel>
                <Input
                    placeholder='Enter your Email'
                    onChange={(e) => setemail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?'text':'password'}
                        placeholder='Enter your password'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <InputRightElement
                        width={"4.5rem"}
                    >
                        <Button h={"1.75rem"} size={'sm'} onClick={handleClick} >
                            {show ? "Hide":"Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='cpassword' isRequired>
                <FormLabel>Confirm-Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?'text':'password'}
                        placeholder='Confirm your Password'
                        onChange={(e) => setconfirmpassword(e.target.value)}
                    />
                    <InputRightElement
                        width={"4.5rem"}
                    >
                        <Button h={"1.75rem"} size={'sm'} onClick={handleClick}>
                            {show ? "Hide":"Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic' >
                <FormLabel>Upload Your Pic</FormLabel>
                
                    <Input
                        type='file'
                        p={1.5}
                        accept='image/*'
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
            </FormControl>
            <Button
                colorScheme='blue'
                width={"100%"}
                style={{marginTop:15}}
                onClick={submitHandler}
            >
                Sign-Up
            </Button>
            </VStack>
    )
}

export default Signup
