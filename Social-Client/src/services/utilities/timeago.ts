import { format, getISOWeek, isSameDay, subDays } from 'date-fns'

class TimeAgo {
  transform(value: any) {
    const date = typeof value === 'string' ? new Date(value) : value
    return this.timeDifference(new Date(), new Date(date))
  }

  chatMessageTransform(value: any) {
    const date = typeof value === 'string' ? new Date(value) : value
    const yesterday = subDays(new Date(), 1)
    if (isSameDay(date, new Date())) {
      return 'Hôm nay'
    } else if (isSameDay(date, yesterday)) {
      return 'Hôm qua'
    } else if (getISOWeek(new Date()) === getISOWeek(date) || getISOWeek(new Date()) - getISOWeek(date) === 1) {
      return format(date, 'EEEE')
    } else {
      return format(date, 'd MMMM yyyy')
    }
  }

  dayMonthYear(value: any) {
    const date = typeof value === 'string' ? new Date(value) : value
    return format(date, 'd MMMM yyyy')
  }

  timeFormat(value: any) {
    const date = typeof value === 'string' ? new Date(value) : value
    return format(date, 'HH:mm a')
  }

  timeDifference(current: any, date: any) {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const elapsed = current.valueOf() - date.valueOf()

    if (format(current, 'yyyy') === format(date, 'yyyy')) {
      if (elapsed < msPerMinute) {
        return this.secondsAgo(elapsed)
      } else if (elapsed < msPerHour) {
        return this.minutesAgo(elapsed, msPerMinute)
      } else if (elapsed < msPerDay) {
        return this.hoursAgo(elapsed, msPerHour)
      } else if (elapsed < msPerMonth) {
        return this.monthsAgo(date, elapsed, msPerDay)
      } else {
        return format(date, 'MMM d')
      }
    } else {
      return format(date, 'MMM d, yyyy')
    }
  }

  secondsAgo(elapsed: any) {
    if (Math.round(elapsed / 1000) <= 1) {
      return '1 giây trước'
    } else {
      return `${Math.round(elapsed / 1000)} giây trước`
    }
  }

  minutesAgo(elapsed: any, msPerMinute: any) {
    if (Math.round(elapsed / msPerMinute) <= 1) {
      return '1 phút phước'
    } else {
      return `${Math.round(elapsed / msPerMinute)} phút trước`
    }
  }

  hoursAgo(elapsed: any, msPerHour: any) {
    if (Math.round(elapsed / msPerHour) <= 1) {
      return '1 giờ trước'
    } else {
      return `${Math.round(elapsed / msPerHour)} giờ trước`
    }
  }

  monthsAgo(date: any, elapsed: any, msPerDay: any) {
    if (Math.round(elapsed / msPerDay) <= 7) {
      return format(date, 'eeee')
    } else {
      return format(date, 'MMM d')
    }
  }
}

export const timeAgo = new TimeAgo()
