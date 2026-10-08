export function validateContact(input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Please check the form and try again." };
  const fields = [
    "name",
    "email",
    "subject",
    "message",
    "website",
    "requestId",
  ];
  if (
    fields.some((k) => input[k] !== undefined && typeof input[k] !== "string")
  )
    return { error: "Please check the form fields." };
  const name = (input.name || "").trim(),
    email = (input.email || "").trim(),
    subject = (input.subject || "").trim(),
    message = (input.message || "").trim();
  if (input.website) return { spam: true };
  if (name.length < 2 || name.length > 100)
    return { error: "Please enter a name between 2 and 100 characters." };
  if (
    email.length > 254 ||
    !/^\S+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(email)
  )
    return { error: "Please enter a valid email address." };
  if (subject.length > 150 || /[\r\n]/.test(subject))
    return {
      error: "Please use a single-line subject of up to 150 characters.",
    };
  if (message.length < 10 || message.length > 5000)
    return { error: "Please write a message between 10 and 5,000 characters." };
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      input.requestId || "",
    )
  )
    return { error: "Please refresh this page and try again." };
  return {
    data: { name, email, subject, message, requestId: input.requestId },
  };
}
