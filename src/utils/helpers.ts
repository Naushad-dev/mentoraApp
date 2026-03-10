export function getInitials(name: string, surname?: string): string {
  const first = name.trim().charAt(0).toUpperCase();
  if (surname) {
    const last = surname.trim().charAt(0).toUpperCase();
    return `${first}${last}`;
  }
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0].charAt(0).toUpperCase()}${parts[1].charAt(0).toUpperCase()}`;
  }
  return first;
}

export function formatDate(dateString: string): string {
  // Handles both ISO (2024-01-10) and DD/MM/YYYY formats
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  return dateString;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function generateId(): string {
  return Date.now().toString();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string, minLength = 6): boolean {
  return password.length >= minLength;
}
