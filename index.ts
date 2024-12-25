import { authorizer } from "@openauthjs/openauth";
import { PasswordAdapter } from "@openauthjs/openauth/adapter/password";
import { PasswordUI } from "@openauthjs/openauth/ui/password";
import { subjects } from "./subjects";
import { MemoryStorage } from "@openauthjs/openauth/storage/memory";

const app = authorizer({
  providers: {
    password: PasswordAdapter(
      PasswordUI({
        sendCode: async (email, code) => {
          console.log(email, code);
        },
      }),
    ),
  },
  subjects,
  async success(ctx, value) {
    let userID;
    if (value.provider === "password") {
      console.log(value.email);
      userID = crypto.randomUUID();
    }
    return ctx.subject("user", {
      userID: userID!,
    });
  },
  storage: MemoryStorage(
    {
        persist: './persist.json'
    }
  )
})

export default app;