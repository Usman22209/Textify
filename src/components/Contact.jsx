import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Context } from "./Context";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const value = useContext(Context);
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    message: Yup.string().required("Please enter your message"),
  });

  const handleSubmit = async (values, { setSubmitting,resetForm },) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await fetch("https://formspree.io/f/mrgndnbn", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        resetForm();
        
      } else {
        setErrorMessage(
          "There was an error sending your message. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage(
        "There was an error sending your message. Please try again later."
      );
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-70px)] container mx-auto pt-[50px] relative">
      <h1 className="text-center font-bold text-2xl">Contact Us</h1>
      <div className="w-[90vw] sm:w-[50vw] mt-16 mx-auto flex gap-3 flex-col relative">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form
              className="flex flex-col gap-3"
              action="https://formspree.io/f/mrgndnbn "
              method="POST"
            >
              <Field
                type="text"
                placeholder="name"
                name="name"
                className={`text-inherit border-[1px] ${
                  value.dark ? "border-white" : "border-black"
                } bg-transparent p-1 rounded w-full`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
              <Field
                type="email"
                placeholder="example@gmail.com"
                name="email"
                className={`text-inherit border-[1px] ${
                  value.dark ? "border-white" : "border-black"
                } bg-transparent p-1 rounded w-full`}
                autoComplete="false"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
              <Field
                as="textarea"
                placeholder="Message"
                name="message"
                className={`text-inherit border-[1px] ${
                  value.dark ? "border-white" : "border-black"
                } bg-transparent p-1 rounded h-48 w-full`}
                autoComplete="false"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />

              <input
                className={`bg-blue-600 w-fit px-2 py-1 rounded text-white absolute right-1 -bottom-10 hover:bg-blue-700 ${
                  isSubmitting ? "disabled opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
                type="submit"
                value={isLoading ? "Sending..." : "Submit"}
              ></input>
              {successMessage && (
                <div className="text-green-500 text-sm mt-2">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
