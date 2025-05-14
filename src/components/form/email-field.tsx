import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

/**
 * Email field that uses validation from zod
 */
export const EmailField = ({
  name,
  label,
  defaultValue,
  control,
  register,
  required: requiredFromProps,
}: any) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: requiredFromProps && "Dit veld is verplicht",
        pattern: {
          value: /^\S[^\s@]*@\S+$/,
          message: "Geen geldig e-mail adres",
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={defaultValue} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
