import './DatePicker.less';
import React from 'react';
import {translate} from '../../i18n';


export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.current = new Date(props.date);
    }

    getCurrentYear = () => this.current.getFullYear();

    getCurrentMonth = () => this.current.getMonth();

    getCurrentDate = () => this.current.getDate();

    setCurrentYear = year => this.current.setFullYear(year);

    setCurrentMonth = month => this.current.setMonth(month);

    setCurrentDate = date => this.current.setDate(date);

    updateCurrentYear = year => {
        this.setCurrentYear(year);
        this.forceUpdate();
    };

    updateCurrentMonth = month => {
        this.setCurrentMonth(month);
        this.forceUpdate();
    };

    updateCurrentDate = date => {
        this.setCurrentDate(date);
        this.forceUpdate();
    };

    updateCurrentYMD = (year, month, date) => {
        this.setCurrentYear(year);
        this.setCurrentMonth(month);
        this.setCurrentDate(date);
        this.forceUpdate();
    };

    getCalendar = () => {
        return createCalendar(
            this.getCurrentYear(),
            this.getCurrentMonth(),
            this.getCurrentDate()
        );
    };

    render() {
        const {shortWeekdays} = this.props;

        const weekInfoList = this.getCalendar();

        return <div className="date-picker">
            <table>
                <tbody>
                {
                    getWeekdaysRow(shortWeekdays)
                }
                {
                    weekInfoList.map(weekInfo => getWeekRow(weekInfo, this.updateCurrentYMD))
                }
                </tbody>
            </table>
        </div>;
    }
}


DatePicker.defaultProps = {
    date: new Date().getTime(),
    shortWeekdays: [
        translate("Su"),
        translate("Mo"),
        translate("Tu"),
        translate("We"),
        translate("Th"),
        translate("Fr"),
        translate("Sa")
    ]
};

/**
 *
 * @param shortWeekdays
 * @returns {Component}
 */
function getWeekdaysRow(shortWeekdays) {
    return <tr className="weekdays-row">
        {
            shortWeekdays.map(wd => <td key={wd} className="weekday-cell">
                <span>{wd}</span>
            </td>)
        }
    </tr>;
}

/**
 *
 * @param {{year, month, date, isInCurrentMonth, isCurrentDate, isToday}[]} dateInfoList
 * @param {function} updateCurrentYMD
 * @returns {Component}
 */
function getWeekRow(dateInfoList, updateCurrentYMD) {
    return <tr className="week-row">
        {
            dateInfoList.map(({year, month, date, isInCurrentMonth, isCurrentDate, isToday}) => {
                return <td
                    key={`${year} ${month} ${date}`}
                    className={
                        'date-cell '
                        + (isInCurrentMonth ? 'is-in-current-month ' : '')
                        + (isCurrentDate ? 'is-current-date ' : '')
                        + (isToday ? 'is-today ' : '')
                    }
                >
                    <span onClick={() => updateCurrentYMD(year, month, date)}>{date}</span>
                </td>;
            })
        }
    </tr>
}


/**
 *
 * @param currentYear
 * @param currentMonth
 * @param currentDate
 * @returns {Array}
 */
function createCalendar(currentYear, currentMonth, currentDate) {

    const now = new Date();
    const calendar = [];
    const threeMonths = [[currentYear, currentMonth]];

    if (currentMonth == 0) {
        threeMonths.unshift([currentYear - 1, 11]);
        threeMonths.push([currentYear, 1]);
    } else if (currentMonth == 11) {
        threeMonths.unshift([currentYear, 10]);
        threeMonths.push([currentYear + 1, 0]);
    } else {
        threeMonths.unshift([currentYear, currentMonth - 1]);
        threeMonths.push([currentYear, currentMonth + 1]);
    }

    let week, day = new Date(threeMonths[0][0], threeMonths[0][1], 1).getDay();

    threeMonths.forEach((item, index) => {
        var i, maxDate = new Date(item[0], item[1] + 1, 0).getDate();

        for (i = 1; i <= maxDate; i++) {
            if (week === undefined) {
                if (day < 6) {
                    day ++;
                } else {
                    week = [];
                }
                continue;
            }

            week.push({
                year: item[0],
                month: item[1],
                date: i,
                isInCurrentMonth: index == 1,
                isCurrentDate: item[0] == currentYear && item[1] == currentMonth && i == currentDate,
                isToday: item[0] == now.getFullYear() && item[1] == now.getMonth() && i == now.getDate()
            });

            if (week.length == 7) {
                calendar.push(week);
                week = [];
            }
        }
    });

    return calendar.filter(week => week.some(item => item.isInCurrentMonth));
}
