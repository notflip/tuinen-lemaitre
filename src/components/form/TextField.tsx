import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const TextField = ({
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
      }}
      render={({ field, fieldState: { error } }) => (
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
