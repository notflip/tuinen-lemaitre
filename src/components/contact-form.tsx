"use client"

import { Form } from "@/components/ui/form"
import { ContactFormValues, getContactFormSchema } from "@/lib/contact-form.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TextField } from "@/components/form/TextField"
import { EmailField } from "@/components/form/EmailField"
import { TextareaField } from "@/components/form/TextareaField"
import { CheckboxField } from "@/components/form/CheckboxField"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import AnimatedButton from "@/components/interface/AnimatedButton"

export function ContactForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(getContactFormSchema()),
    defaultValues: {
      naam: "",
      email: "",
      telefoon: "",
      boodschap: "",
      accepteer: false,
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form: "Contact Formulier",
          data: data,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setLoading(false)
        setError(errorData.message || "Er deed zich een fout voor bij het verzenden.")
        return
      }

      const result = await response.json()
      setSuccess("Bedankt voor je aanvraag!")
      console.log("Submission successful:", result)
      setLoading(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(
        "Een overwachte fout heeft zich voorgedaan, neem contact op met een administrator",
      )
      setLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Foutmelding</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Succes</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {!success && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            method="POST"
          >
            <TextField label="Naam" control={form.control} name="naam" />
            <EmailField name="email" label="E-mail adres" control={form.control} />
            <TextField name="telefoon" label="Telefoonnummer" control={form.control} />
            <TextareaField
              name="boodschap"
              control={form.control}
              label="Bericht"
              placeholder="Typ uw bericht..."
            />
            <CheckboxField
              name="accepteer"
              label={
                <>
                  Ik accepteer de{" "}
                  <a
                    target="_blank"
                    href="/privacy-policy"
                    className="underline hover:opacity-80"
                  >
                    privacy policy
                  </a>
                </>
              }
              control={form.control}
            />
            <AnimatedButton variant="foreground" type="submit" disabled={loading}>
              {loading ? <span>Laden...</span> : <span>Verzenden</span>}
            </AnimatedButton>
          </form>
        </Form>
      )}
    </div>
  )
}
