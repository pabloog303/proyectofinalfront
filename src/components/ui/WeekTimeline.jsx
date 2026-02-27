import './ui.css'
import PropTypes from 'prop-types'

export default function WeekTimeline({ total = 12, current = 1 }) {
  const totalWeeks = Math.max(1, total)
  const currentWeek = Math.max(1, Math.min(totalWeeks, current))

  const steps = Array.from({ length: totalWeeks }, (_, i) => {
    const n = i + 1
    const state = n < currentWeek ? 'done' : n === currentWeek ? 'active' : 'todo'
    return { n, state }
  })

  return (
    <div className="ui-timeline" aria-label={`Timeline de ${totalWeeks} semanas`}
    >
      {steps.map((s) => (
        <div key={s.n} className={`ui-timeline-step ${s.state}`}>
          <div className="ui-timeline-dot" />
          <div className="ui-timeline-label">{String(s.n).padStart(2, '0')}</div>
        </div>
      ))}
    </div>
  )
}

WeekTimeline.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
}
