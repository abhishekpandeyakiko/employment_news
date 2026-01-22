import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  mobile: Yup.string().matches(/^\d{10}$/, "Enter a valid 10-digit mobile number").required("Mobile is required"),
  subject: Yup.string().required("Grievance subject is required"),
  category: Yup.string().required("Category is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  pincode: Yup.string().matches(/^\d{6}$/, "Enter a valid 6-digit pincode").required("Pincode is required"),
  text: Yup.string().required("Grievance text is required"),
  captcha: Yup.string().required("Captcha is required"),
  // file: not required
});



export default function GrievanceForm() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);


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


  const [captcha, setCaptcha] = useState();
  const [loading, setLoading] = useState(false);
  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (values.captcha !== captcha) {
        alert("Captcha did not match. Please try again.");
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
        setCaptcha(generateCaptcha()); // If you have captcha logic
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
          {({ setFieldValue, values }) => (
            <Form className="bg-white rounded-lg shadow p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"name"} /> :</label>
                <Field type="text" id="name" name="name" placeholder={t("enter-name")} className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200" aria-required="true" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mb-4" />

                <label htmlFor="address" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"address"} /> :</label>
                <Field type="text" id="address" name="address" placeholder={t("enter-address")} className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200" aria-required="true" />
                <ErrorMessage name="address" component="div" className="text-red-500 text-xs mb-4" />

                <label htmlFor="mobile" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"mobile"} /> :</label>
                <Field type="text" id="mobile" name="mobile" placeholder={t("enter-mobile-number")} className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200" aria-required="true" />
                <ErrorMessage name="mobile" component="div" className="text-red-500 text-xs mb-4" />

                <label htmlFor="subject" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"grievance-subject"} /> :</label>
                <Field type="text" id="subject" name="subject" placeholder={t("enter-grievance-subject")} className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200" aria-required="true" />
                <ErrorMessage name="subject" component="div" className="text-red-500 text-xs mb-4" />

                <label htmlFor="file" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"upload-attachment"} />  :</label>
                <input type="file" id="file" name="file" onChange={e => setFieldValue("file", e.target.files[0])} className="mb-4" />
              </div>
              <div>
                <label htmlFor="category" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"select-category"} /></label>
                <Field as="select" id="category" name="category" className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200" aria-required="true">
                  <option>RTI Related</option>
                  <option>General</option>
                  <option>Technical</option>
                  <option>Other</option>
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-xs mb-4" />

                <label htmlFor="email" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"email"} /> :</label>

                <Field type="email" name="email" placeholder={t("enter-email")} className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mb-4" />

                <label htmlFor="pincode" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"pincode"} />  :</label>

                <Field type="text" id="pincode" name="pincode" placeholder={t("enter-pincode")} className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200" aria-required="true" />
                <ErrorMessage name="pincode" component="div" className="text-red-500 text-xs mb-4" />

                <label htmlFor="text" className="block font-semibold text-primary-700 mb-1 text-left"><Translate text={"grievance-text"} /> :</label>
                <Field as="textarea" id="text" name="text" placeholder={t("enter-grievance-text")} rows={4} className="w-full border border-primary-200 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-200" aria-required="true" />
                <ErrorMessage name="text" component="div" className="text-red-500 text-xs mb-4" />
              </div>
              <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="captcha" className="font-semibold text-primary-700 text-left"><Translate text={"enter-captcha"} /> :</label>
                  {/* <span className="rounded border border-primary-200 bg-primary-50 px-3 py-2 font-mono text-lg select-none">{captcha}</span> */}
                  <canvas
                    ref={canvasRef}
                    width={130}
                    height={40}
                    className="border rounded"
                  />
                  <Field type="text" id="captcha" name="captcha" placeholder={t("enter-captcha")} className="border border-primary-200 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-primary-200" aria-required="true" />
                  <button type="button" onClick={handleRefreshCaptcha} className="ml-2 text-primary-700 hover:text-primary-800 text-xl" title="Refresh Captcha" aria-label="Refresh Captcha">⟳</button>
                  <ErrorMessage name="captcha" component="div" className="text-red-500 text-xs ml-2" />
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
