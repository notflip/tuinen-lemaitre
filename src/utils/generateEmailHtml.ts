import ejs from "ejs"
import fs from "fs"
import juice from "juice"
import path from "path"

export const generateEmailHTML = (data: any): string => {
  const templatePath = path.join(process.cwd(), "src/email/template.ejs")
  const templateContent = fs.readFileSync(templatePath, "utf8")
  const preInlinedCSS = ejs.render(templateContent, {
    ...data,
    cta: data.cta || {},
  })
  return juice(preInlinedCSS)
}
