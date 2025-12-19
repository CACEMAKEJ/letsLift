export function decodeJwt(token: string): {
  role?: "Coach" | "User";
  [key: string]: any;
} {
  const base64Payload = token.split(".")[1];
  const jsonPayload = atob(base64Payload);
  const payload = JSON.parse(jsonPayload);

  // ASP.NET Core role claim key
  const role =
    payload.role ??
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  return {
    ...payload,
    role
  };
}