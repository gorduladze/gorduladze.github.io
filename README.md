# gorduladze.github.io

Lesson timetable for class 2.3 of Newton Free School, published at
https://gorduladze.github.io.

## Structure

- `index.html` – page shell
- `js/schedule.js` – the timetable data (days, subjects, lessons)
- `js/timetable.js` – renders the schedule into the page: a time grid on
  screens wider than 900px, and a list of day cards (with today highlighted)
  on phones and small tablets
- `css/timetable.css` – page and timetable styles (based on [Timetable.js](https://github.com/Grible/timetable.js))

## Updating the timetable

Edit `js/schedule.js`: add or change entries in `lessons`, for example

```js
{ day: 0, subject: 'english', start: '12:00', end: '12:45' }
```

`day` is the index into `days` (0 = Monday), and `subject` is a key of
`subjects`. To add a new subject, add it to `subjects` with its Georgian
name and the search query its link should use.

No build step is needed: commit to `master` and GitHub Pages serves the files
as they are. The repository must be public (or on a paid plan) for Pages to
publish it.
