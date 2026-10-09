// Renders window.SCHEDULE (see schedule.js) into the .timetable element.
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

  function render(container, schedule) {
    var scopeStart = schedule.startHour * 60;
    var scopeMinutes = (schedule.endHour - schedule.startHour) * 60;

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
    var rowItems = schedule.days.map(function () {
      var li = el('li');
      rows.appendChild(li);
      return li;
    });

    schedule.lessons.forEach(function (lesson) {
      var subject = schedule.subjects[lesson.subject];
      var row = rowItems[lesson.day];
      if (!subject || !row) {
        console.warn('Skipping invalid lesson', lesson);
        return;
      }

      var start = toMinutes(lesson.start) - scopeStart;
      var duration = toMinutes(lesson.end) - toMinutes(lesson.start);

      var link = el('a', 'time-entry');
      link.href = 'https://www.google.com/search?q=' + encodeURIComponent(subject.query);
      link.target = '_blank';
      link.rel = 'noopener';
      link.title = subject.name + ', ' + lesson.start + ' - ' + lesson.end;
      link.style.left = (start / scopeMinutes) * 100 + '%';
      link.style.width = (duration / scopeMinutes) * 100 + '%';
      link.appendChild(el('span', 'name', subject.name));
      link.appendChild(el('span', 'hours', lesson.start + ' - ' + lesson.end));
      row.appendChild(link);
    });

    grid.appendChild(rows);
    section.appendChild(grid);

    container.style.setProperty('--hours', schedule.endHour - schedule.startHour);
    container.textContent = '';
    container.appendChild(aside);
    container.appendChild(section);
  }

  var container = document.querySelector('.timetable');
  if (container && window.SCHEDULE) {
    render(container, window.SCHEDULE);
  }
})();
