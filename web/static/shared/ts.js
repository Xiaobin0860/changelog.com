class Time {
  constructor(date) {
    this.date = date;
    this.hours = date.getHours();
  }

  year() {
    return this.date.getFullYear().toString().substr(2, 2);
  }

  month() {
    return this.date.getMonth() + 1;
  }

  day() {
    return this.date.getDate();
  }

  hours12() {
   if (this.hours > 12) {
    return this.hours - 12;
   } else {
    return this.hours;
   }
  }

  hours24() {
    return this.hours;
  }

  minutes(fallback) {
    let m = this.date.getMinutes();

    if (m == 0) {
      m = fallback;
    } else if (m < 10) {
      m = `:0${m}`;
    } else {
      m = `:${m}`;
    }

    return m;
  }

  amPm() {
    if (this.hours > 12) {
      return "PM";
    } else {
      return "AM";
    }
  }

  tz() {
    return this.date.toString().match(/\(([\w\s]+)\)/)[1];
  }

  adminStyle() {
    return `${this.month()}/${this.day()}/${this.year()} – ${this.hours12()}${this.minutes("")}${this.amPm()} (${this.tz()})`;
  }

  liveStyle() {
    return `${this.hours12()}${this.minutes(":00")} ${this.tz()}`;
  }
}

export default function ts(date, style) {
  const t = new Time(date);
  return t[`${style}Style`].call(t);
}
