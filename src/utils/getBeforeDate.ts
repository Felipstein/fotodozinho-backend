export function getBeforeData(when: 'today' | 'lastweek' | 'lastmonth') {
  const times = {
    today: 1,
    lastweek: 7,
    lastmonth: 30,
  };

  const time = times[when];
  if(!time) {
    throw new Error('Invalid date name');
  }

  const before = Date.now() - time * 24 * 60 * 60 * 1000;

  return new Date(before);
}
