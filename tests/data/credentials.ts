export const VALID_USERS = {
  student: {
    email: process.env.STUDENT_EMAIL || 'student@test.com',
    password: process.env.STUDENT_PASSWORD || 'Test@1234!',
    role: 'student',
  },
  instructor: {
    email: process.env.INSTRUCTOR_EMAIL || 'instructor@test.com',
    password: process.env.INSTRUCTOR_PASSWORD || 'Teach@5678!',
    role: 'instructor',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@test.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@9012!',
    role: 'admin',
  },
} as const;

export const INVALID_CREDENTIALS = [
  { email: '', password: '', label: 'empty fields' },
  { email: 'notanemail', password: 'Password1!', label: 'malformed email' },
  { email: 'user@test.com', password: '', label: 'empty password' },
  { email: "'; DROP TABLE users;--", password: 'test', label: 'SQL injection' },
  { email: '<script>alert(1)</script>@test.com', password: 'test', label: 'XSS in email' },
  { email: 'a'.repeat(300) + '@test.com', password: 'test', label: 'email overflow' },
  { email: 'valid@test.com', password: 'password', label: 'weak password' },
] as const;
