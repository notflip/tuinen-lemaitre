import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

export const TextareaField = ({
  name,
  label,
  defaultValue,
  control,
  required: requiredFromProps,
  placeholder,
}: any) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {requiredFromProps && <span className="text-xs">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className="resize-none" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
