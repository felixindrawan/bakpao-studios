import { FormData } from "@/app/components/strapi/sections/ContactUsForm";

export async function sendEmail(data: FormData) {
  const apiEndpoint = "/api/email";
  await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response.message);
    })
    .catch((err) => {
      console.error(`send-email error: ${err}`);
    });
}
