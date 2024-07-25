import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const PasswordForget = () => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Body className="bg-white font-sans">
      <Container className="mx-auto p-5 pb-12 bg-no-repeat bg-bottom">
        <Heading className="text-2xl font-bold mt-12">
          🪄 Reset your password
        </Heading>
        <Section className="my-6">
          <Text className="text-lg leading-7"></Text>
          <Text className="text-lg leading-7">
            If you did not ask for this, skip this email.
          </Text>
        </Section>
        <Text className="text-lg leading-7">
          Sincerely,
          <br />- The HygiChecker team!
        </Text>
        <Hr className="border-t border-gray-300 mt-12" />
      </Container>
    </Body>
  </Html>
);

export default PasswordForget;
