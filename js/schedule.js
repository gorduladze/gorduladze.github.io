// Timetable data. Edit this file to change the schedule.
//
// Each lesson needs a day (index into `days`), a subject (key of `subjects`)
// and start/end times as "HH:MM".
window.SCHEDULE = {
  // First and last hour shown on the time axis.
  startHour: 10,
  endHour: 16,

  days: ['ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი'],

  subjects: {
    english:  { name: 'ინგლისური',  query: 'English' },
    georgian: { name: 'ქართული',    query: 'Georgian' },
    math:     { name: 'მათემატიკა', query: 'Mathematics' },
    art:      { name: 'ხელოვნება',  query: 'Art' },
    nature:   { name: 'ბუნება',     query: 'Nature' },
    tutor:    { name: 'ტუტორი',     query: 'Tutor' },
    music:    { name: 'მუსიკა',     query: 'Music' }
  },

  lessons: [
    { day: 0, subject: 'english',  start: '12:00', end: '12:45' },
    { day: 0, subject: 'georgian', start: '13:00', end: '13:45' },

    { day: 1, subject: 'math',     start: '11:00', end: '11:45' },
    { day: 1, subject: 'art',      start: '14:00', end: '14:45' },

    { day: 2, subject: 'nature',   start: '11:00', end: '11:45' },
    { day: 2, subject: 'georgian', start: '13:00', end: '13:45' },

    { day: 3, subject: 'tutor',    start: '11:00', end: '11:45' },
    { day: 3, subject: 'english',  start: '12:00', end: '12:45' },

    { day: 4, subject: 'math',     start: '11:00', end: '11:45' },
    { day: 4, subject: 'music',    start: '14:00', end: '14:45' }
  ]
};
