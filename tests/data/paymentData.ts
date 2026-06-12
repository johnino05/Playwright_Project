import type { CardDetails } from '../pages/CheckoutPage';

export const TEST_CARDS: Record<string, CardDetails> = {
  visaSuccess: {
    number: '4242 4242 4242 4242',
    expiry: '12/30',
    cvv: '123',
    name: 'Test User',
  },
  visaDeclined: {
    number: '4000 0000 0000 0002',
    expiry: '12/30',
    cvv: '123',
    name: 'Test User',
  },
  requires3DS: {
    number: '4000 0025 0000 3155',
    expiry: '12/30',
    cvv: '123',
    name: 'Test User',
  },
  insufficientFunds: {
    number: '4000 0000 0000 9995',
    expiry: '12/30',
    cvv: '123',
    name: 'Test User',
  },
  invalidNumber: {
    number: '1234 5678 9012 3456',
    expiry: '12/30',
    cvv: '123',
    name: 'Test User',
  },
  expiredCard: {
    number: '4242 4242 4242 4242',
    expiry: '01/20',
    cvv: '123',
    name: 'Test User',
  },
};

export const EDGE_CASE_INPUTS = [
  '',
  ' ',
  '\n\t\r',
  '🔥💯🎓',
  '正确密码',
  '../../../etc/passwd',
  'null',
  'undefined',
  'A'.repeat(256),
] as const;
