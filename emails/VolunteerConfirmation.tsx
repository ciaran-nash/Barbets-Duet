import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VolunteerConfirmationProps {
  name: string;
  siteName?: string;
  email?: string;
}

export default function VolunteerConfirmation({
  name,
  siteName,
}: VolunteerConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your volunteer application has been received — Barbets Duet</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Heading style={h1}>Application Received</Heading>

          <Text style={text}>Dear {name},</Text>

          <Text style={text}>
            Thank you for your interest in volunteering with Barbets Duet
            {siteName ? ` at ${siteName}` : ''}. We have received your application and will
            review it within 2 weeks.
          </Text>

          <Hr style={divider} />

          {/* What happens next */}
          <Section>
            <Heading as="h2" style={h2}>
              What happens next
            </Heading>
            <Text style={mutedText}>
              Our team will review your application and contact you to arrange a brief
              conversation about your interest and availability. We receive applications
              from around the world, so we appreciate your patience.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* About the network */}
          <Section>
            <Heading as="h2" style={h2}>
              About the Jumuiya network
            </Heading>
            <Text style={mutedText}>
              Barbets Duet connects 13 learning sites across East Africa, the UK, and the
              USA. Each site is a living classroom for ecological restoration — from
              regenerative farming in Cornwall to seaweed cultivation in Tanzania.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Text style={footerText}>Barbets Duet — 13 Learning Sites, One Jumuiya</Text>
          <Link href="https://barbetsduet.org" style={footerLink}>
            barbetsduet.org
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#06211A',
  fontFamily: 'Georgia, "Times New Roman", serif',
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px 24px',
};

const h1: React.CSSProperties = {
  color: '#DBFF66',
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: '1.2',
  marginBottom: '24px',
  marginTop: 0,
};

const h2: React.CSSProperties = {
  color: '#DBFF66',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '1.3',
  marginBottom: '12px',
  marginTop: 0,
};

const text: React.CSSProperties = {
  color: '#F4F4F5',
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '16px',
};

const mutedText: React.CSSProperties = {
  color: '#A1A1AA',
  fontSize: '14px',
  lineHeight: '1.6',
  marginBottom: '16px',
};

const divider: React.CSSProperties = {
  borderColor: '#006F53',
  borderTopWidth: '1px',
  margin: '28px 0',
};

const footerText: React.CSSProperties = {
  color: '#71717A',
  fontSize: '12px',
  lineHeight: '1.5',
  marginBottom: '8px',
};

const footerLink: React.CSSProperties = {
  color: '#DBFF66',
  fontSize: '12px',
  textDecoration: 'none',
};
