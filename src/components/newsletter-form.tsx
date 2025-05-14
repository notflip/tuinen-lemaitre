"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  email: string
}

export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const [message, setMessage] = useState<{
    text: string
    type: "success" | "error"
  } | null>(null)

  const onSubmit = async (data: FormData) => {
    setMessage(null)
    try {
      const response = await fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ text: "Inschrijving voltooid!", type: "success" })
        reset()
      } else {
        setMessage({
          text: result.error || "Er ging iets mis...",
          type: "error",
        })
      }
    } catch {
      setMessage({ text: "Er ging iets mis...", type: "error" })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <div className="relative w-full">
        <input
          type="email"
          {...register("email", {
            required: "E-mail adres is een verplicht veld",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Geen geldig e-mail adres",
            },
          })}
          className="block p-3 w-full rounded-l-[12px] rounded-se-2xl rounded-ee-2xl z-20 text-sm text-gray-900 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
          placeholder="E-mail adres"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute top-0 end-0 p-3 flex items-center rounded-e-2xl h-full bg-primary hover:bg-primary/90 text-black"
        >
          {isSubmitting ? "Aanmelden..." : "Aanmelden"}
          <div className="ml-2 relative flex items-center justify-center w-8 h-8 bg-white bg-opacity-30 rounded-full transform transition-transform duration-300 ease-in-out group-hover:translate-x-1">
            <ArrowRight size={16} />
          </div>
        </button>
      </div>

      {errors.email && (
        <p className="mt-2 text-red-600 text-sm">{errors.email.message}</p>
      )}

      {message && (
        <p
          className={`mt-2 text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message.text}
        </p>
      )}
    </form>
  )
}
