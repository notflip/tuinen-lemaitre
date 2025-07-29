import type { CollectionBeforeValidateHook } from "payload";

const uniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

const beforeDuplicate: CollectionBeforeValidateHook = ({
  data = {},
  operation,
  originalDoc,
}) => {
  if (operation === "create" && originalDoc?.slug) {
    const originalTitle = originalDoc.title || "";
    const originalSlug = originalDoc.slug || "";

    // Ensure "(copy)" is only added once
    data.title = originalTitle.includes("(copy)")
      ? originalTitle
      : `${originalTitle} (copy)`;

    // Remove any existing "-copy-<id>" before adding new one
    const cleanedSlug = originalSlug.replace(/-copy-[a-z0-9]+$/, "");
    data.slug = `${cleanedSlug}-copy-${uniqueId()}`;
  }

  return data;
};

export default beforeDuplicate;
