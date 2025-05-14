import React from "react"
import { Star } from "lucide-react"

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.ceil(rating)
  const emptyStars = 5 - fullStars

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={`full-${i}`} fill="#F3C142" stroke="none" />
      ))}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={`empty-${i}`} stroke="#F3C142" fill="none" />
      ))}
    </div>
  )
}

export default StarRating
