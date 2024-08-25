import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

export default function ForgotPassword({ username, otp }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        Here&apos;s your reset password verification code: {otp}
      </Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},Forgot Password OTP</Heading>
          <Text>This code is valid up to 1 hour only</Text>
          <Heading as="h1">{otp}</Heading>
          <Text>
            If you did not requested this code, please ignore this email.
          </Text>
        </Row>
        <Row>
          {/* <Button
            href={`http://localhost:3000/verify/${username}`}
            style={{ color: "#61dafb" }}
          >
            Verify here
          </Button> */}
        </Row>
      </Section>
    </Html>
  );
}
