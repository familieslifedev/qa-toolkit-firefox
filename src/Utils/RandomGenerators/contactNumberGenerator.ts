

export function generateUKMobileNumber(): string {
	const prefix:string = '07';
  const mobileNumber = Math.floor(Math.random() * 900000000);
  return String(prefix + mobileNumber);
}