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

interface DonationReceiptProps {
  donorName: string;
  amount: number;
  currency: string;
  donationType: 'one-time' | 'monthly';
  siteName?: string;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  gbp: '£',
  usd: '$',
  eur: '€',
  kes: 'KSh',
};

export default function DonationReceipt({
  donorName,
  amount,
  currency,
  donationType,
  siteName,
}: DonationReceiptProps) {
  const symbol = CURRENCY_SYMBOLS[currency.toLowerCase()] ?? currency.toUpperCase();
  const formattedAmount = `${symbol}${amount.toFixed(2)}`;
  const isMonthly = donationType === 'monthly';

  return (
    <Html>
      <Head />
      <Preview>
        Thank you for your {isMonthly ? 'monthly ' : ''}donation — Barbets Duet
      </Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Heading style={h1}>Thank You for Your Donation</Heading>

          <Text style={text}>Dear {donorName},</Text>

          <Text style={text}>
            Your {isMonthly ? 'monthly ' : ''}gift of{' '}
            <strong style={{ color: '#DBFF66' }}>{formattedAmount}</strong> has been
            received. Your generosity directly funds restoration work in the Jumuiya
            network.
          </Text>

          {/* Donation summary */}
          <Section style={summaryBox}>
            <Text style={summaryLabel}>Donation summary</Text>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={summaryCell}>Amount</td>
                  <td style={{ ...summaryCell, textAlign: 'right', color: '#DBFF66' }}>
                    {formattedAmount}
                  </td>
                </tr>
                <tr>
                  <td style={summaryCell}>Type</td>
                  <td style={{ ...summaryCell, textAlign: 'right', color: '#F4F4F5' }}>
                    {isMonthly ? 'Monthly recurring' : 'One-time'}
                  </td>
                </tr>
                {siteName && (
                  <tr>
                    <td style={summaryCell}>Designated site</td>
                    <td style={{ ...summaryCell, textAlign: 'right', color: '#F4F4F5' }}>
                      {siteName}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Section>

          <Hr style={divider} />

          {/* Site-specific message */}
          {siteName && (
            <Section>
              <Text style={text}>
                Your gift supports{' '}
                <strong style={{ color: '#DBFF66' }}>{siteName}</strong> — one of 13
                real conservation sites in the Jumuiya network.
              </Text>
            </Section>
          )}

          {/* Monthly note */}
          {isMonthly && (
            <Section>
              <Heading as="h2" style={h2}>
                Your monthly commitment
              </Heading>
              <Text style={mutedText}>
                Your monthly donation of {formattedAmount} will recur each month. You
                can manage or cancel your subscription at any time by contacting us at{' '}
                <Link href="mailto:hello@barbetsduet.org" style={{ color: '#DBFF66' }}>
                  hello@barbetsduet.org
                </Link>
                .
              </Text>
            </Section>
          )}

          <Hr style={divider} />

          {/* Impact message */}
          <Section>
            <Heading as="h2" style={h2}>
              Your impact
            </Heading>
            <Text style={mutedText}>
              Every contribution funds restoration work — from seaweed cultivation and
              cichlid breeding in Tanzania to regenerative farming in Cornwall. The
              Jumuiya network is powered by people like you.
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

const summaryBox: React.CSSProperties = {
  backgroundColor: '#0D3326',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '8px',
};

const summaryLabel: React.CSSProperties = {
  color: '#71717A',
  fontSize: '11px',
  fontFamily: 'monospace',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  marginBottom: '12px',
  marginTop: 0,
};

const summaryCell: React.CSSProperties = {
  color: '#A1A1AA',
  fontSize: '14px',
  padding: '6px 0',
  borderBottom: '1px solid #1a4a35',
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
