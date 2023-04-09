import React from 'react'
import { Button, VStack } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { useState } from 'react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleClick = () => setShow(!show)
    const postDetails = (pics) => { };
    const submitHandler = () => { };
    return (
        <VStack spacing={"5px"} >
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
                        type={show ? 'text' : 'password'}
                        placeholder='Enter your password'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <InputRightElement
                        width={"4.5rem"}
                    >
                        <Button h={"1.75rem"} size={'sm'} onClick={handleClick} >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme='blue'
                width={"100%"}
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Login
            </Button>
            <Button 
                variant={'solid'}
                colorScheme='red'
                width={"100%"}
                onClick={()=>{
                    setemail("guest@example.com")
                    setpassword('123456')
                }}
            >
                Get Guest user Credentials
            </Button>
        </VStack>
    )

}

export default Login
