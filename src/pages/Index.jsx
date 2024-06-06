import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, HStack, Box, IconButton } from "@chakra-ui/react";
import { FaUserPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addMember = () => {
    setMembers([...members, { name, email }]);
    setName("");
    setEmail("");
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">会員管理システム</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="名前" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="メール" value={email} onChange={(e) => setEmail(e.target.value)} />
          <IconButton aria-label="Add Member" icon={<FaUserPlus />} onClick={addMember} />
        </HStack>
        <VStack spacing={2} width="100%">
          {members.map((member, index) => (
            <HStack key={index} spacing={4} width="100%" justifyContent="space-between">
              <Box>
                <Text>{member.name}</Text>
                <Text>{member.email}</Text>
              </Box>
              <IconButton aria-label="Remove Member" icon={<FaTrash />} onClick={() => removeMember(index)} />
            </HStack>
          ))}
        </VStack>
        <Button colorScheme="blue" onClick={() => (window.location.href = "/checkout")}>
          Pay with PayPal
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
