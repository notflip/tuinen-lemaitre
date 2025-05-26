import * as React from "react";

import {
  Body,
  Container,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const SubmissionEmail = ({ doc }: any) => {
  const baseUrl = "http://localhost:3000";


  const formFields = Object.entries(doc.data).filter(
    ([key]) => key !== "accept"
  );

  return (
    <Html>
      <Tailwind>
        <Body style={main}>
          <Img
            src={`${baseUrl}/static/logo-wajo.png`}
            width="50"
            className="mx-auto mt-8"
          />
          <Container style={container}>
            <Heading className="text-center">{doc.form}</Heading>
            <Section className="bg-slate-100 p-4 rounded">
              {(formFields || {}).map(([key, value]) => (
                <Text key={key} className="text-base">
                  <span className="font-bold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <br />
                  {String(value)}
                </Text>
              ))}
              <Text className="text-base">
                <span className="font-bold">Aangevraagd op</span>
                <br />
                {doc.createdAt}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

SubmissionEmail.PreviewProps = {
  doc: {
    id: 1,
    form: "Test Form",
    data: {
      name: "tester",
      email: "test@test.be",
      phone: "04893234",
      accept: true,
      message: "tester",
    },
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
};

const main = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

export default SubmissionEmail;
