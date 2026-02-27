import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Wrapper simple para animar contenido al entrar en viewport.
 * Uso: <MotionInView>...</MotionInView>
 */
export default function MotionInView({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

MotionInView.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  y: PropTypes.number,
  once: PropTypes.bool,
}
