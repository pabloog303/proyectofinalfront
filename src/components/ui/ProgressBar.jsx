import { motion } from 'framer-motion'
import './ui.css'
import PropTypes from 'prop-types'

export default function ProgressBar({ value = 0, label, sublabel }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0))

  return (
    <div className="ui-progress">
      <div className="ui-progress-head">
        <div>
          <div className="ui-progress-label">{label}</div>
          {sublabel ? <div className="ui-progress-sublabel">{sublabel}</div> : null}
        </div>
        <div className="ui-progress-value">{v.toFixed(0)}%</div>
      </div>

      <div className="ui-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v}>
        <motion.div
          className="ui-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string.isRequired,
  sublabel: PropTypes.string,
}
