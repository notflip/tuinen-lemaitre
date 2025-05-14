"use client"

import { Form as FormType } from "@payload-types"
import { buildInitialFormState } from "@/components/form/buildInitialFormState"
import AnimatedButton from "@/components/interface/AnimatedButton"
import RichText from "@/components/RichText"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { fieldsMap } from "@/components/form/fieldsMap"
import Link from "next/link"

interface FormProps {
  form: FormType
}

export const Form: React.FC<FormProps> = ({ form }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
    fields,
  } = form

  const formMethods = useForm({
    defaultValues: buildInitialFormState(fields as any[]),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const router = useRouter()

  const onSubmit = async (data: Record<string, any>) => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/submissions`, {
        body: JSON.stringify({
          form: formID,
          data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })

      const res = await req.json()
      if (req.status >= 400) {
        setIsLoading(false)
        setError({
          message: res.errors?.[0]?.message || "Internal Server Error",
          status: res.status,
        })

        return
      }

      setIsLoading(false)
      setHasSubmitted(true)

      if (confirmationType === "redirect" && redirect) {
        const { url } = redirect
        const redirectUrl = url
        if (redirectUrl) router.push(redirectUrl)
      }
    } catch (err) {
      console.warn(err)
      setIsLoading(false)
      setError({
        message: "Something went wrong.",
      })
    }
  }

  if (!fields?.length) {
    return <p>No fields to render.</p>
  }

  return (
    <Fragment>
      {!isLoading && hasSubmitted && confirmationType === "message" && (
        <RichText data={confirmationMessage!} />
      )}

      {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}

      {!hasSubmitted && (
        <FormProvider {...formMethods}>
          <Fragment>
            {isLoading && <p>Loading…</p>}
            {hasSubmitted && confirmationType === "message" && (
              <div>
                <RichText data={confirmationMessage!} />
              </div>
            )}
            {!hasSubmitted && (
              <form
                id="form"
                key={formID}
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-xl space-y-4 scroll-mt-[300px]"
              >
                {fields.map((field, i) => {
                  //@ts-ignore
                  const FieldComponent = fieldsMap[field.blockType]
                  return (
                    <FieldComponent
                      key={i}
                      form={form}
                      {...field}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  )
                })}
                <AnimatedButton variant="foreground">
                  {submitButtonLabel ?? "Verzenden"}
                </AnimatedButton>
              </form>
            )}
          </Fragment>
        </FormProvider>
      )}
    </Fragment>
  )
}
