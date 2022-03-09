export async function send_email(event) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "success": true,
    }),
  };
}

export async function validate_otp(event) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "is_valid": false,
    }),
  };
}