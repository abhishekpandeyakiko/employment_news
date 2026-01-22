import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { createPost } from "../utils/networkApi";
import Loader from "../components/Loader";
import Swal from 'sweetalert2';
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";

const initialValues = {
  name: "",
  address: "",
  mobile: "",
  subject: "",
  category: "RTI Related",
  email: "",
  pincode: "",
  text: "",
  captcha: "",
  file: null,
};

// Accessible error message: announced by screen readers and visually obvious
const AccessibleErrorMessage = ({ name, id }) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => (
        <div
          id={id}
          role="alert"
          aria-live="polite"
          className="text-red-600 text-sm mt-1 mb-3 flex items-start gap-2"
        >
          <span className="sr-only">Error: </span>
          <span aria-hidden="true" className="text-red-600 font-bold">!</span>
          <span>{msg}</span>
        </div>
      )}
    </ErrorMessage>
  );
};

// Accessible Field: adds aria-invalid + aria-describedby that points to the error message
const AccessibleField = ({ name, id, errorId, describedByIds = [], as, className = "", ...props }) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  const Component = as || "input";
  const describedBy = [
    ...describedByIds.filter(Boolean),
    ...(hasError ? [errorId] : []),
  ].join(" ") || undefined;

  return (
    <>
      <Component
        {...field}
        {...props}
        id={id}
        name={name}
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={describedBy}
        className={`${className} ${hasError ? "border-red-500 focus:ring-red-500" : ""}`}
      />
      {hasError ? <AccessibleErrorMessage name={name} id={errorId} /> : null}
    </>
  );
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required. Enter your full name.")
    .min(2, "Name is too short. Enter at least 2 characters."),
  address: Yup.string()
    .required("Address is required. Enter your full address."),
  mobile: Yup.string()
    .required("Mobile number is required. Enter your 10-digit number.")
    .matches(/^\d{10}$/, "Mobile number is invalid. Enter exactly 10 digits (no spaces)."),
  subject: Yup.string()
    .required("Subject is required. Enter a short subject."),
  category: Yup.string()
    .required("Category is required. Select one option."),
  email: Yup.string()
    .required("Email is required. Enter your email address.")
    .email("Email is invalid. Enter a valid email address."),
  pincode: Yup.string()
    .required("Pincode is required. Enter your 6-digit pincode.")
    .matches(/^\d{6}$/, "Pincode is invalid. Enter exactly 6 digits."),
  text: Yup.string()
    .required("Grievance details are required. Describe your issue."),
  captcha: Yup.string()
    .required("Captcha is required. Type the characters shown."),
  // file: not required
});



export default function GrievanceForm() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);

  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);


  const generateCaptchaText = (length = 5) => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < length; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  };

  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Generate captcha
    const captchaText = generateCaptchaText();
    setCaptcha(captchaText);


    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text style
    ctx.font = "20px monospace";
    ctx.fillStyle = "#1f2937";
    ctx.textBaseline = "middle";

    // Draw rotated text
    for (let i = 0; i < captchaText.length; i++) {
      const x = 15 + i * 22;
      const y = canvas.height / 2;
      const angle = (Math.random() - 0.5) * 0.4;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }

    // Noise lines
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = "#9ca3af";
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleRefreshCaptcha = () => {
    generateCaptcha();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      if (values.captcha !== captcha) {
        setFieldError(
          "captcha",
          "Captcha does not match. Re-check and type the same characters (or refresh captcha)."
        );
        generateCaptcha();
        return false;
      }
      setSubmitting(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "file" && value) {
          formData.append(key, value);
        } else if (key !== "file") {
          formData.append(key, value);
        }
      });
      setLoading(true);
      const response = await createPost('grievance/send', formData);
      setLoading(false)
      if (response.success) {
        resetForm();
        Swal.fire({
          title: 'Success!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        generateCaptcha(); // Regenerate captcha after success
      }

    } catch (error) {
      setLoading(false)
      console.error("Submission error:", error);
      alert("Failed to submit the form.");
    } finally {
      setLoading(false)
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full min-h-[80vh] bg-primary-50 py-8 px-2 md:px-0">
      {loading && <Loader />}
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-600 mb-6 text-left"><Translate text={"grievance-form"} /> </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="bg-white rounded-lg shadow p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
              <div>
                <label htmlFor="name" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"name"} /> <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <AccessibleField
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("enter-name")}
                  errorId="name-error"
                  aria-required="true"
                  describedByIds={["name-help"]}
                  className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <div id="name-help" className="text-gray-600 text-xs mb-2">
                  Enter your full name.
                </div>

                <label htmlFor="address" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"address"} /> <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <AccessibleField
                  type="text"
                  id="address"
                  name="address"
                  placeholder={t("enter-address")}
                  errorId="address-error"
                  aria-required="true"
                  describedByIds={["address-help"]}
                  className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <div id="address-help" className="text-gray-600 text-xs mb-2">
                  Enter your complete address (house/street, city, state).
                </div>

                <label htmlFor="mobile" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"mobile"} /> <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <AccessibleField
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder={t("enter-mobile-number")}
                  errorId="mobile-error"
                  aria-required="true"
                  describedByIds={["mobile-help"]}
                  inputMode="numeric"
                  maxLength={10}
                  className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <div id="mobile-help" className="text-gray-600 text-xs mb-2">
                  Enter a 10-digit mobile number (digits only).
                </div>

                <label htmlFor="subject" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"grievance-subject"} /> <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <AccessibleField
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={t("enter-grievance-subject")}
                  errorId="subject-error"
                  aria-required="true"
                  describedByIds={["subject-help"]}
                  className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <div id="subject-help" className="text-gray-600 text-xs mb-2">
                  Enter a short subject for your grievance.
                </div>

                <label htmlFor="file" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"upload-attachment"} /> <span className="text-gray-600 font-normal">(optional)</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={e => setFieldValue("file", e.target.files[0])}
                  className="mb-1"
                  aria-describedby="file-help"
                />
                <div id="file-help" className="text-gray-600 text-xs mb-4">
                  Upload a supporting document (optional).
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"select-category"} /> <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <AccessibleField
                  as="select"
                  id="category"
                  name="category"
                  errorId="category-error"
                  aria-required="true"
                  describedByIds={["category-help"]}
                  className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Select category</option>
                  <option value="RTI Related">RTI Related</option>
                  <option value="General">General</option>
                  <option value="Technical">Technical</option>
                  <option value="Other">Other</option>
                </AccessibleField>
                <div id="category-help" className="text-gray-600 text-xs mb-2">
                  Choose the category that best matches your issue.
                </div>

                <label htmlFor="email" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"email"} /> <span className="text-red-600" aria-hidden="true">*</span>
                </label>

                <AccessibleField
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("enter-email")}
                  errorId="email-error"
                  aria-required="true"
                  describedByIds={["email-help"]}
                  inputMode="email"
                  className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <div id="email-help" className="text-gray-600 text-xs mb-2">
                  Enter your email address for follow-up.
                </div>

                <label htmlFor="pincode" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"pincode"} /> <span className="text-red-600" aria-hidden="true">*</span>
                </label>

                <AccessibleField
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder={t("enter-pincode")}
                  errorId="pincode-error"
                  aria-required="true"
                  describedByIds={["pincode-help"]}
                  inputMode="numeric"
                  maxLength={6}
                  className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <div id="pincode-help" className="text-gray-600 text-xs mb-2">
                  Enter your 6-digit pincode (digits only).
                </div>

                <label htmlFor="text" className="block font-semibold text-primary-700 mb-1 text-left">
                  <Translate text={"grievance-text"} /> <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <AccessibleField
                  as="textarea"
                  id="text"
                  name="text"
                  placeholder={t("enter-grievance-text")}
                  rows={4}
                  errorId="text-error"
                  aria-required="true"
                  describedByIds={["text-help"]}
                  className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <div id="text-help" className="text-gray-600 text-xs mb-2">
                  Describe the issue clearly (what happened and where).
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="captcha" className="font-semibold text-primary-700 text-left">
                    <Translate text={"enter-captcha"} /> <span className="text-red-600" aria-hidden="true">*</span>
                  </label>
                  {/* <span className="rounded border border-primary-200 bg-primary-50 px-3 py-2 font-mono text-lg select-none">{captcha}</span> */}
                  <canvas
                    ref={canvasRef}
                    width={130}
                    height={40}
                    className="border rounded"
                  />
                  <AccessibleField
                    type="text"
                    id="captcha"
                    name="captcha"
                    placeholder={t("enter-captcha")}
                    errorId="captcha-error"
                    aria-required="true"
                    describedByIds={["captcha-help"]}
                    autoComplete="off"
                    className="border border-primary-200 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                  <button type="button" onClick={handleRefreshCaptcha} className="ml-2 text-primary-700 hover:text-primary-800 text-xl" title="Refresh Captcha" aria-label="Refresh Captcha">⟳</button>
                </div>
                <div id="captcha-help" className="text-gray-600 text-xs">
                  Type the characters shown in the image.
                </div>
                <button type="submit" className="ml-auto bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-2 rounded shadow transition">{<Translate text={"submit-form"} />}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
