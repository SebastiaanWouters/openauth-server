import { authorizer } from "@openauthjs/openauth";
import { PasswordAdapter } from "@openauthjs/openauth/adapter/password";
import { PasswordUI } from "@openauthjs/openauth/ui/password";
import { subjects } from "./subjects";
import { MemoryStorage } from "@openauthjs/openauth/storage/memory";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const app = authorizer({
  providers: {
    password: PasswordAdapter(
      PasswordUI({
        sendCode: async (email, code) => {
          resend.emails.send({
            from: 'auth@sebdev.be',
            to: email,
            subject: 'Sebdev Account Verification',
            html: `<p>Thanks for signing up, Use this code to verify your account: ${code}</p><br><p>Greetings, Sebdev</p>`,
          });
        },
      }),
    ),
  },
  subjects,
  async success(ctx, value) {
    return ctx.subject("user", {
      email: value.email,
    });
  },
  storage: MemoryStorage(
    {
        persist: './data/persist.json'
    }
  )
})

export default app;