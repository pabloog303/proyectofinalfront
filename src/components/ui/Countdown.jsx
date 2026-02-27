import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

function diffParts(targetDate) {
  const now = new Date()
  const target = new Date(targetDate)
  const ms = Math.max(0, target - now)

  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, ms }
}

export default function Countdown({ targetDate }) {
  const hasDate = useMemo(() => !!targetDate && !Number.isNaN(new Date(targetDate).getTime()), [targetDate])
  const [parts, setParts] = useState(() => (hasDate ? diffParts(targetDate) : null))

  useEffect(() => {
    if (!hasDate) return

    const id = setInterval(() => {
      setParts(diffParts(targetDate))
    }, 1000)

    return () => clearInterval(id)
  }, [hasDate, targetDate])

  if (!hasDate) {
    return (
      <div className="ui-countdown-empty">
        Define tu fecha objetivo y desbloquea el countdown para la carrera.
      </div>
    )
  }

  const items = [
    { label: 'DÍAS', value: parts.days },
    { label: 'HRS', value: parts.hours },
    { label: 'MIN', value: parts.minutes },
    { label: 'SEG', value: parts.seconds },
  ]

  return (
    <div className="ui-countdown">
      {items.map((it) => (
        <div className="ui-countdown-item" key={it.label}>
          <div className="ui-countdown-value">{String(it.value).padStart(2, '0')}</div>
          <div className="ui-countdown-label">{it.label}</div>
        </div>
      ))}
    </div>
  )
}

Countdown.propTypes = {
  targetDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
}
