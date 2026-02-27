import './ui.css'
import PropTypes from 'prop-types'

export default function GlassCard({ children, className = '', as: As = 'div' }) {
  return <As className={`ui-glass ${className}`}>{children}</As>
}

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
}
