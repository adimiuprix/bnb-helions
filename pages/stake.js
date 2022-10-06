import { Container, Text, Button } from "@nextui-org/react";
import React from "react";
import { Nav } from "../components/Nav";
import StakingTable from "../components/StakingTable";

function stake() {
  return (
    <Container>
      <Nav stake={true} />
      <StakingTable />
    </Container>
  );
}

export default stake;
