export default function generatePlan({ raceDate, level, daysPerWeek }) {
  const startDate = new Date();
  const endDate = new Date(raceDate);
  const totalWeeks = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24 * 7));

  const plan = [];

  for (let week = 1; week <= totalWeeks; week++) {
    const days = [];

    for (let d = 0; d < daysPerWeek; d++) {
      days.push({
        day: `Día ${d + 1}`,
        distance: `${5 + week} km`,
        done: false,
      });
    }

    plan.push({ week, days });
  }

  return { startDate, raceDate, level, plan };
}
