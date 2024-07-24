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
    <Preview>Réinitialisez votre mot de passe</Preview>
    <Body className="bg-white font-sans">
      <Container
        className="mx-auto p-5 pb-12 bg-no-repeat bg-bottom"
        style={{ backgroundImage: 'url("/assets/raycast-bg.png")' }}
      >
        <Heading className="text-2xl font-bold mt-12">
          🪄 Réinitialisez votre mot de passe
        </Heading>
        <Section className="my-6">
          <Text className="text-lg leading-7"></Text>
          <Text className="text-lg leading-7">
            Si vous avez pas demandé ceci, ignorez cet e-mail.
          </Text>
        </Section>
        <Text className="text-lg leading-7">
          Cordialement,
          <br />- Léquipe de votre application
        </Text>
        <Hr className="border-t border-gray-300 mt-12" />
        <Text className="text-gray-500 text-xs ml-1">
          Votre entreprise Inc.
        </Text>
        <Text className="text-gray-500 text-xs ml-1">
          Adresse de lentreprise
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordForget;
