"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { validateEmail } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const { t } = useLocale();
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contactForm.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contactForm.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.contactForm.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contactForm.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const supabase = createClient();

      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || null,
        message: formData.message.trim(),
        status: "new",
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(t.contactForm.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
    setSubmitError(null);
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardContent className="py-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-terracotta flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-sans font-semibold text-charcoal mb-4">
            {t.contactForm.thankYou}
          </h2>
          <p className="text-lg font-sans text-mid mb-8">
            {t.contactForm.successMessage}
          </p>
          <Button onClick={handleReset} variant="outline">
            {t.contactForm.sendAnother}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t.contactForm.heading}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t.contactForm.nameLabel}
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder={t.contactForm.namePlaceholder}
            required
          />

          <Input
            label={t.contactForm.emailLabel}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder={t.contactForm.emailPlaceholder}
            required
          />

          <Input
            label={t.contactForm.companyLabel}
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder={t.contactForm.companyPlaceholder}
          />

          <Textarea
            label={t.contactForm.messageLabel}
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            placeholder={t.contactForm.messagePlaceholder}
            rows={6}
            required
          />

          {submitError && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-4">
              <p className="text-sm font-sans text-red-600">{submitError}</p>
            </div>
          )}

          <Button type="submit" loading={isSubmitting} className="w-full">
            {t.contactForm.sendMessage}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
