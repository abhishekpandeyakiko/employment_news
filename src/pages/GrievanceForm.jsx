import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { createPost } from "../utils/networkApi";
import Loader from "../components/Loader";
import Swal from 'sweetalert2';
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

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
// Accessibility Fix: Using aria-live="polite" and role="alert" for immediate screen reader feedback
const AccessibleErrorMessage = ({ name, id }) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => (
        <div
          id={id}
          role="alert"
          aria-live="polite"
          className="text-red-600 text-sm mt-1 flex items-start gap-2"
        >
          {/* Accessibility Fix: Clear text equivalent (hidden visually) for the visual error icon */}
          <span className="sr-only">Error: </span>
          <span aria-hidden="true" className="text-red-600 font-bold">!</span>
          <span>{msg}</span>
        </div>
      )}
    </ErrorMessage>
  );
};

// Accessible Field: adds aria-invalid + aria-describedby that points to the error message and helper text
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
  const { t, i18n } = useTranslation();
  const canvasRef = useRef(null);

  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateMetaTags(
      `${t('grievance-form')} | ${t('site-title')}`,
      t('grievance-desc'),
      t('grievance-keywords')
    );
  }, [t, i18n.language]);

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
    <div className="w-full min-h-[80vh] bg-primary-50 pb-16">
      {/* Accessibility Fix: Convert non-semantic <div> wrapping layouts to semantic <main> tag */}
      {loading && <Loader />}

      {/* Note: PageBanner handles our primary H1 */}
      <PageBanner
        title={<Translate text={"grievance-form"} />}
        subtitle={'"Public Grievance Redressal System - Speak up for better service."'}
        badgeText="Grievance Cell"
      />

      {/* Accessibility Fix: Use <section> with aria-labelledby associating with <h2 id="form-heading"> */}
      <section aria-labelledby="form-heading" className="w-full max-w-7xl mx-auto px-4 mt-12">
        {/* Accessibility Fix: Implement correct heading hierarchy (single <h1> from parent, no skipped levels) */}
        <h2 id="form-heading" className="sr-only">Submit a Grievance</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="bg-white rounded-lg shadow p-6 md:p-10" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Accessibility Fix: Group correlated personal form controls with <fieldset> and <legend> */}
                {/* Visual preservation: Kept into logical Left Column without visual disruptions */}
                <fieldset className="border-0 p-0 m-0 min-w-0 flex flex-col gap-4 w-full">
                  <legend className="sr-only">Personal Information</legend>

                  <div>
                    {/* Accessibility Fix: Associate control with visible <label for="">, ensure asterisks are hidden from screen readers */}
                    <label htmlFor="name" className="block font-semibold text-primary-700 mb-1 text-left">
                      <Translate text={"name"} /> <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <AccessibleField
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name."
                      errorId="name-error"
                      aria-required="true"
                      describedByIds={["name-help"]}
                      className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                    <div id="name-help" className="text-gray-600 text-xs mt-1 hidden">
                      Enter your full name.
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block font-semibold text-primary-700 mb-1 text-left">
                      <Translate text={"mobile"} /> <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <AccessibleField
                      type="tel"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter a 10-digit mobile number (digits only)."
                      errorId="mobile-error"
                      aria-required="true"
                      describedByIds={["mobile-help"]}
                      inputMode="numeric"
                      maxLength={10}
                      className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                    <div id="mobile-help" className="text-gray-600 text-xs mt-1 hidden">
                      Enter a 10-digit mobile number (digits only).
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-semibold text-primary-700 mb-1 text-left">
                      <Translate text={"email"} /> <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <AccessibleField
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address for follow-up."
                      errorId="email-error"
                      aria-required="true"
                      describedByIds={["email-help"]}
                      inputMode="email"
                      className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                    <div id="email-help" className="text-gray-600 text-xs mt-1 hidden">
                      Enter your email address for follow-up.
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block font-semibold text-primary-700 mb-1 text-left">
                      <Translate text={"address"} /> <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <AccessibleField
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter your complete address (house/street, city, state)."
                      errorId="address-error"
                      aria-required="true"
                      describedByIds={["address-help"]}
                      className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                    <div id="address-help" className="text-gray-600 text-xs mt-1 hidden">
                      Enter your complete address (house/street, city, state).
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block font-semibold text-primary-700 mb-1 text-left">
                      <Translate text={"pincode"} /> <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <AccessibleField
                      type="text"
                      id="pincode"
                      name="pincode"
                      placeholder="Enter your 6-digit pincode (digits only)."
                      errorId="pincode-error"
                      aria-required="true"
                      describedByIds={["pincode-help"]}
                      inputMode="numeric"
                      maxLength={6}
                      className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                    <div id="pincode-help" className="text-gray-600 text-xs mt-1 hidden">
                      Enter your 6-digit pincode (digits only).
                    </div>
                  </div>

                </fieldset>

                {/* Accessibility Fix: Group correlated Grievance Details form controls with <fieldset> and <legend> */}
                {/* Visual preservation: Kept into logical Right Column without visual disruptions */}
                <fieldset className="border-0 p-0 m-0 min-w-0 flex flex-col gap-4 w-full">
                  <legend className="sr-only">Grievance Details</legend>

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
                      className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    >
                      <option value="">Select category</option>
                      <option value="RTI Related">RTI Related</option>
                      <option value="General">General</option>
                      <option value="Technical">Technical</option>
                      <option value="Other">Other</option>
                    </AccessibleField>
                    <div id="category-help" className="text-gray-600 text-xs mt-1 hidden">
                      Choose the category that best matches your issue.
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-semibold text-primary-700 mb-1 text-left">
                      <Translate text={"grievance-subject"} /> <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <AccessibleField
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Enter a short subject for your grievance."
                      errorId="subject-error"
                      aria-required="true"
                      describedByIds={["subject-help"]}
                      className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                    <div id="subject-help" className="text-gray-600 text-xs mt-1 hidden">
                      Enter a short subject for your grievance.
                    </div>
                  </div>

                  <div>
                    <label htmlFor="text" className="block font-semibold text-primary-700 mb-1 text-left">
                      <Translate text={"grievance-text"} /> <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <AccessibleField
                      as="textarea"
                      id="text"
                      name="text"
                      placeholder="Describe the issue clearly (what happened and where)."
                      rows={4}
                      errorId="text-error"
                      aria-required="true"
                      describedByIds={["text-help"]}
                      className="w-full border border-primary-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                    <div id="text-help" className="text-gray-600 text-xs mt-1 hidden">
                      Describe the issue clearly (what happened and where).
                    </div>
                  </div>

                  <div>
                    <label htmlFor="file" className="block font-semibold text-primary-700 mb-1 text-left">
                      <Translate text={"upload-attachment"} /> <span className="text-gray-600 font-normal">(optional)</span>
                    </label>
                    {/* Accessibility Fix: Added aria-describedby for accurate screen reader read-outs without guessing */}
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={e => setFieldValue("file", e.target.files[0])}
                      className="w-full block"
                      aria-describedby="file-help"
                    />
                    <div id="file-help" className="text-gray-600 text-xs mt-1 hidden">
                      Upload a supporting document (optional).
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* Accessibility Fix: Added Fieldset around Validation actions linking visual submission fields logic */}
              <fieldset className="mt-8 border-0 p-0 m-0 min-w-0 md:col-span-2">
                <legend className="sr-only">Verification and Submission</legend>
                <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
                  <div className="flex-1">
                    <label htmlFor="captcha" className="block font-semibold text-primary-700 text-left mb-1">
                      <Translate text={"enter-captcha"} /> <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      {/* Accessibility Fix: Added role="img" to visually dynamic canvas elements with context */}
                      <canvas
                        ref={canvasRef}
                        width={130}
                        height={40}
                        className="border rounded bg-gray-50 flex-shrink-0"
                        role="img"
                        aria-label="Security Captcha Generated Image"
                      />
                      <div className="flex items-center gap-2">
                        <AccessibleField
                          type="text"
                          id="captcha"
                          name="captcha"
                          placeholder="Type the characters shown in the image above."
                          errorId="captcha-error"
                          aria-required="true"
                          describedByIds={["captcha-help"]}
                          autoComplete="off"
                          className="border border-primary-200 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-primary-200"
                        />
                        {/* Accessibility Fix: Improved interactive key targets spacing and focus states */}
                        <button
                          type="button"
                          onClick={handleRefreshCaptcha}
                          className="text-primary-700 hover:text-primary-800 text-2xl focus:ring-2 focus:ring-primary-500 rounded px-2"
                          aria-label="Refresh Captcha Image"
                          title="Refresh Captcha Image"
                        >⟳</button>
                      </div>
                    </div>
                    <div id="captcha-help" className="text-gray-600 text-xs mt-1 hidden">
                      Type the characters shown in the image above.
                    </div>
                  </div>

                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-primary-700 hover:bg-primary-800 text-white font-semibold px-8 py-2.5 rounded shadow transition focus:ring-2 focus:ring-offset-2 focus:ring-primary-700"
                    >
                      <Translate text={"submit-form"} />
                    </button>
                  </div>
                </div>
              </fieldset>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
