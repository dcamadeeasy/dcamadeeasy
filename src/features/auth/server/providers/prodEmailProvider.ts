import type { Provider } from "@auth/core/providers";
import { sendMail } from "flareutils";

async function sendVerMail() {
  const result = await sendMail({
    from: {
      name: "John Foobar",
      email: "john@foobar.baz",
    },
    personalizations: {
      from: {
        email: "dzoltow@gmail.com",
      },
      to: [
        {
          name: "Jane Foobar",
          email: "dzoltow@gmail.com",
        },
      ],
      reply_to: {
        email: "dzoltow@gmail.com",
      },
      subject: "Where do I find that blue shark plushy?",
    },
    content: [
      {
        type: "text/plain",
        value:
          "I've been looking for that blue shark plushy for ages, but I can't find it anywhere. Do you know where I can find it?",
      },
    ],
  });
}

export function ProdEmailProvider(): Provider {
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
      sendVerMail();
      console.log(url);
    },
  };
}
