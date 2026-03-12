'use client'

import { motion, HTMLMotionProps } from "motion/react"

// We extend HTMLMotionProps for a 'div' so your component 
// inherits all valid Framer Motion properties automatically.
interface MotionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export default function Motion({ children, ...props }: MotionProps) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  )
}