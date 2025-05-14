// validateImage.ts
import type { PayloadRequest } from "payload"

interface ImageValidatorOptions {
  isRequired: boolean
}

/**
 * Returns a validation function that checks an image upload.
 * @param options - An object containing the isRequired flag.
 */
export const validateLandscapeImage = ({ isRequired }: ImageValidatorOptions) => {
  return async (
    value: any,
    { req }: { req: PayloadRequest },
  ): Promise<true | string> => {
    // If no value is provided and the field isn't required, it's valid.
    if (!value) {
      if (isRequired) {
        return "Image is required."
      }
      return true
    }

    try {
      const mediaItem = await req.payload.findByID({
        collection: "media",
        id: value,
      })

      if (!mediaItem) {
        return "Invalid image."
      }

      const { width, height } = mediaItem

      if (!width || !height) {
        return "Uploaded file is missing dimensions."
      }
      if (width < 1.4 * height) {
        return "Image must have a width at least 1.4 times the height (landscape format required)."
      }

      return true
    } catch (error) {
      console.error("Image validation error:", error)
      return "Error validating image. Please try again."
    }
  }
}
