import React from 'react'

export default function HighlightedText({text}) {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent mx-2">
        {text}
    </span>
  )
}
