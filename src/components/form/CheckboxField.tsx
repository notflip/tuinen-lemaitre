import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

export const CheckboxField = ({
  name,
  label,
  control,
  required: requiredFromProps,
}: any) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start gap-2 space-y-0 rounded-md">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              {label}
              {requiredFromProps && <span>*</span>}
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
