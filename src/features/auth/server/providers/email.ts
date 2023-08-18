import type { Provider } from "@auth/core/providers";

export function EmailProvider(): Provider {
  return {
    id: "email",
    type: "email",
    name: "Email",
    server: "",
    from: "DCAMadeEasy <no-reply@dcamadeeasy.com>",
    maxAge: 24 * 60 * 60,
    options: {},
    sendVerificationRequest: ({ url }) => {
      // TODO: send an email or automatically redirect in DEV mode
      console.log(url);
    },
  };
}
