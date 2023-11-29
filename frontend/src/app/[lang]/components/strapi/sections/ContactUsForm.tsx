"use client";

import { sendEmail } from "@/app/[lang]/utils/send-email";
import { FormEvent, useState } from "react";

enum FORM_TYPE {
  TEXT = "text",
  EMAIL = "email",
  TEXT_AREA = "textarea",
}

type FormInfo = {
  id: FORM_DATA;
  autoComplete: string;
  label: string;
  type: FORM_TYPE;
};

enum FORM_DATA {
  NAME = "name",
  EMAIL = "email",
  MESSAGE = "message",
}

export type FormData = {
  [FORM_DATA.NAME]: string;
  [FORM_DATA.EMAIL]: string;
  [FORM_DATA.MESSAGE]: string;
};

const FORM_INFO: FormInfo[] = [
  {
    id: FORM_DATA.NAME,
    autoComplete: "given-name",
    type: FORM_TYPE.TEXT,
    label: "Name",
  },
  {
    id: FORM_DATA.EMAIL,
    autoComplete: "email",
    label: "Email",
    type: FORM_TYPE.EMAIL,
  },
  {
    id: FORM_DATA.MESSAGE,
    autoComplete: "",
    label: "Message",
    type: FORM_TYPE.TEXT_AREA,
  },
];

type ContactUsFormProps = {
  title?: string;
  description?: string;
  email?: string;
};

export default function ContactUsForm({ data }: { data: ContactUsFormProps }) {
  const [sendStatus, setSendStatus] = useState("");
  const [formValues, setFormValues] = useState({
    [FORM_DATA.NAME]: "",
    [FORM_DATA.EMAIL]: "",
    [FORM_DATA.MESSAGE]: "",
  });
  const { title, description, email } = data;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValues?.name && formValues?.email && formValues?.message) {
      sendEmail(formValues)
        .then((status) => {
          setSendStatus("success");
          setFormValues({
            [FORM_DATA.NAME]: "",
            [FORM_DATA.EMAIL]: "",
            [FORM_DATA.MESSAGE]: "",
          });
        })
        .catch(() => setSendStatus("error"));
    } else {
      setSendStatus("error");
    }
  };
  return (
    <form
      id="contact-us-form"
      onSubmit={onSubmit}
      method="POST"
      className="mx-auto max-w-xl"
    >
      {title && <div className="mb-5 text-lg text-gray-900">{title}</div>}
      {description && (
        <div className="mb-5 text-sm  text-gray-900">{description}</div>
      )}
      {email && (
        <div className="mb-5 text-sm  text-gray-900">
          Feel free to contact me either through this form or directly emailing
          us at{" "}
          <a
            href={`mailto:${email}`}
            className="text-sm font-semibold text-gray-900"
          >
            {email}
          </a>
          !
        </div>
      )}
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {FORM_INFO.map(({ id, label, type, autoComplete }, i) => {
          return (
            <div className="sm:col-span-2" key={i}>
              <label
                htmlFor={id}
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {label} <span className="text-red-400">*</span>
              </label>
              <div className="mt-2.5">
                {type === "textarea" ? (
                  <textarea
                    onChange={(e) => {
                      setFormValues({ ...formValues, [id]: e.target.value });
                      sendStatus !== "" && setSendStatus("");
                    }}
                    value={formValues?.[id]}
                    placeholder={label}
                    name={id}
                    id={id}
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                ) : (
                  <input
                    onChange={(e) => {
                      setFormValues({ ...formValues, [id]: e.target.value });
                      sendStatus !== "" && setSendStatus("");
                    }}
                    value={formValues?.[id]}
                    placeholder={label}
                    type={type}
                    name={id}
                    id={id}
                    autoComplete={autoComplete}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {`Let's talk`}
        </button>
      </div>
      {sendStatus === "success" ? (
        <h5 className="mt-5 text-green-400">Email sent!</h5>
      ) : sendStatus === "error" ? (
        <h5 className="mt-5 text-red-400">
          Error occured. Please fill all fields above!
        </h5>
      ) : (
        <></>
      )}
    </form>
  );
}
