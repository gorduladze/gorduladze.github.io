// Renders window.SCHEDULE (see schedule.js) into the .timetable element.
//
// Two views are built from the same data: a time grid for wider screens and
// a list of day cards for phones. css/timetable.css shows one of them
// depending on the screen width.
(function () {
  'use strict';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function toMinutes(time) {
    var parts = time.split(':');
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function searchUrl(subject) {
    return 'https://www.google.com/search?q=' + encodeURIComponent(subject.query);
  }

  function lessonLink(className, subject, lesson) {
    var link = el('a', className);
    link.href = searchUrl(subject);
    link.target = '_blank';
    link.rel = 'noopener';
    link.title = subject.name + ', ' + lesson.start + ' - ' + lesson.end;
    return link;
  }

  // Valid lessons grouped by day and sorted by start time.
  function lessonsByDay(schedule) {
    var days = schedule.days.map(function () { return []; });
    schedule.lessons.forEach(function (lesson) {
      var subject = schedule.subjects[lesson.subject];
      if (!subject || !days[lesson.day]) {
        console.warn('Skipping invalid lesson', lesson);
        return;
      }
      days[lesson.day].push({ lesson: lesson, subject: subject });
    });
    days.forEach(function (items) {
      items.sort(function (a, b) {
        return toMinutes(a.lesson.start) - toMinutes(b.lesson.start);
      });
    });
    return days;
  }

  // Index into schedule.days for today, or -1 on weekends.
  // Assumes days start on Monday.
  function todayIndex(schedule) {
    var index = (new Date().getDay() + 6) % 7; // Monday = 0
    return index < schedule.days.length ? index : -1;
  }

  function renderGrid(schedule, days) {
    var scopeStart = schedule.startHour * 60;
    var scopeMinutes = (schedule.endHour - schedule.startHour) * 60;

    var view = el('div', 'tt-grid');
    view.style.setProperty('--hours', schedule.endHour - schedule.startHour);

    // Day names column.
    var aside = el('aside');
    var dayList = el('ul');
    schedule.days.forEach(function (day) {
      var li = el('li');
      li.appendChild(el('span', 'row-heading', day));
      dayList.appendChild(li);
    });
    aside.appendChild(dayList);

    // Time axis.
    var section = el('section');
    var grid = el('div', 'grid');

    var header = el('header');
    var hours = el('ul');
    for (var h = schedule.startHour; h <= schedule.endHour; h++) {
      var hourLi = el('li');
      hourLi.appendChild(el('span', 'time-label', pad(h) + ':00'));
      hours.appendChild(hourLi);
    }
    header.appendChild(hours);
    grid.appendChild(header);

    // One row per day.
    var rows = el('ul', 'room-timeline');
    days.forEach(function (items) {
      var row = el('li');
      items.forEach(function (item) {
        var start = toMinutes(item.lesson.start) - scopeStart;
        var duration = toMinutes(item.lesson.end) - toMinutes(item.lesson.start);

        var link = lessonLink('time-entry', item.subject, item.lesson);
        link.style.left = (start / scopeMinutes) * 100 + '%';
        link.style.width = (duration / scopeMinutes) * 100 + '%';
        link.appendChild(el('span', 'name', item.subject.name));
        link.appendChild(el('span', 'hours', item.lesson.start + ' - ' + item.lesson.end));
        row.appendChild(link);
      });
      rows.appendChild(row);
    });

    grid.appendChild(rows);
    section.appendChild(grid);
    view.appendChild(aside);
    view.appendChild(section);
    return view;
  }

  function renderList(schedule, days) {
    var today = todayIndex(schedule);
    var view = el('div', 'tt-list');

    days.forEach(function (items, index) {
      var card = el('section', 'day-card' + (index === today ? ' is-today' : ''));
      var heading = el('h2', 'day-name', schedule.days[index]);
      if (index === today) heading.appendChild(el('span', 'today-badge', 'დღეს'));
      card.appendChild(heading);

      if (items.length === 0) {
        card.appendChild(el('p', 'no-lessons', 'გაკვეთილები არ არის'));
      } else {
        var list = el('ul', 'lesson-list');
        items.forEach(function (item) {
          var li = el('li');
          var link = lessonLink('lesson', item.subject, item.lesson);
          link.appendChild(el('span', 'lesson-time', item.lesson.start + ' – ' + item.lesson.end));
          link.appendChild(el('span', 'lesson-name', item.subject.name));
          li.appendChild(link);
          list.appendChild(li);
        });
        card.appendChild(list);
      }
      view.appendChild(card);
    });
    return view;
  }

  function render(container, schedule) {
    var days = lessonsByDay(schedule);
    container.textContent = '';
    container.appendChild(renderGrid(schedule, days));
    container.appendChild(renderList(schedule, days));
  }

  var container = document.querySelector('.timetable');
  if (container && window.SCHEDULE) {
    render(container, window.SCHEDULE);
  }
})();
