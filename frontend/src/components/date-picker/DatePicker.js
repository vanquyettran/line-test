import './DatePicker.less';
import React from 'react';
import {translate} from '../../i18n';
import Icon from '../../components/icon/Icon';


export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.current = new Date(props.date);

        this.state = {
            shownYear: this.getCurrentYear(),
            shownMonth: this.getCurrentMonth()
        };
    }

    /**
     * @return {number}
     */
    getCurrentYear = () => this.current.getFullYear();

    /**
     * @return {number}
     */
    getCurrentMonth = () => this.current.getMonth();

    /**
     * @return {number}
     */
    getCurrentDate = () => this.current.getDate();

    setCurrentYear = year => this.current.setFullYear(year);

    setCurrentMonth = month => this.current.setMonth(month);

    setCurrentDate = date => this.current.setDate(date);

    updateCurrentYear = year => {
        this.setCurrentYear(year);
        this.resetShownYearMonth();
    };

    updateCurrentMonth = month => {
        this.setCurrentMonth(month);
        this.resetShownYearMonth();
    };

    updateCurrentDate = date => {
        this.setCurrentDate(date);
        this.resetShownYearMonth();
    };

    updateCurrentYMD = (year, month, date) => {
        this.setCurrentYear(year);
        this.setCurrentMonth(month);
        this.setCurrentDate(date);
        this.resetShownYearMonth();
    };

    resetShownYearMonth = () => {
        this.setState({
            shownYear: this.getCurrentYear(),
            shownMonth: this.getCurrentMonth()
        });
    };

    getWeekInfoList = () => {
        const {
            shownYear,
            shownMonth
        } = this.state;

        return createCalendar(
            this.getCurrentYear(),
            this.getCurrentMonth(),
            this.getCurrentDate(),
            shownYear,
            shownMonth
        );
    };

    backwardMonth = () => {
        this.setState(({shownYear, shownMonth}) => {
            if (shownMonth === 0) {
                shownMonth = 11;
                shownYear--;
            } else {
                shownMonth--;
            }
            return {shownYear, shownMonth};
        });
    };

    forwardMonth = () => {
        this.setState(({shownYear, shownMonth}) => {
            if (shownMonth === 11) {
                shownMonth = 0;
                shownYear++;
            } else {
                shownMonth++;
            }
            return {shownYear, shownMonth};
        });
    };

    render() {
        const {
            shortWeekdays,
            shortMonths,
            months,
            yearMonthTemplate,
            getIsValidDate
        } = this.props;

        const {
            shownYear,
            shownMonth
        } = this.state;

        return <div className="date-picker">
            <table>
                <tbody>
                {
                    getYearMonthRow(
                        yearMonthTemplate, this.getCurrentYear(),
                        this.getCurrentMonth(), months, shortMonths,
                        this.backwardMonth, this.forwardMonth
                    )
                }
                {
                    getWeekdaysRow(shortWeekdays)
                }
                {
                    this.getWeekInfoList().map(
                        weekInfo => getWeekRow(weekInfo, getIsValidDate, this.updateCurrentYMD)
                    )
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
    ],
    shortMonths: [
        translate("Jan"),
        translate("Feb"),
        translate("Mar"),
        translate("Apr"),
        translate("May"),
        translate("Jun"),
        translate("Jul"),
        translate("Aug"),
        translate("Sep"),
        translate("Oct"),
        translate("Nov"),
        translate("Dec")
    ],
    months: [
        translate("January"),
        translate("February"),
        translate("March"),
        translate("April"),
        translate("May"),
        translate("June"),
        translate("July"),
        translate("August"),
        translate("September"),
        translate("October"),
        translate("November"),
        translate("December")
    ],
    yearMonthTemplate: '{shortMonth} {year}',
    getIsValidDate: (year, month, date) => {
        return new Date(year, month, date, 23, 59, 59).getTime() >= new Date().getTime();
    }
};


/**
 *
 * @param {string} yearMonthTemplate
 * @param {number} year
 * @param {number} month
 * @param {string[]} months
 * @param {string[]} shortMonths
 * @param {function|null} backwardMonth
 * @param {function|null} forwardMonth
 */
function getYearMonthRow(yearMonthTemplate, year, month, months, shortMonths, backwardMonth, forwardMonth) {
    return <tr className="year-month-row">
        <td className="month-backward-cell">
            {
                backwardMonth &&
                <div onClick={() => backwardMonth()}>
                    <Icon name="angle-left"/>
                </div>
            }
        </td>
        <td className="year-month-cell" colSpan="5">
            <div>
                {
                    yearMonthTemplate
                        .replace(/\{year\}/g, '' + year)
                        .replace(/\{month\}/g, months[month])
                        .replace(/\{shortMonth\}/g, shortMonths[month])
                }
            </div>
        </td>
        <td className="month-forward-cell">
            {
                forwardMonth &&
                <div onClick={() => forwardMonth()}>
                    <Icon name="angle-right"/>
                </div>
            }
        </td>
    </tr>
}


/**
 *
 * @param shortWeekdays
 * @returns {Component}
 */
function getWeekdaysRow(shortWeekdays) {
    return <tr className="weekdays-row">
        {
            shortWeekdays.map(wd => <td key={wd} className="weekday-cell">
                <div>{wd}</div>
            </td>)
        }
    </tr>;
}


/**
 *
 * @param {{year, month, date, isInCurrentMonth, isCurrentDate, isToday}[]} dateInfoList
 * @param {function} getIsValidDate
 * @param {function} updateCurrentYMD
 * @returns {Component}
 */
function getWeekRow(dateInfoList, getIsValidDate, updateCurrentYMD) {
    return <tr className="week-row">
        {
            dateInfoList.map(({year, month, date, isInCurrentMonth, isCurrentDate, isToday}) => {
                const isValid = getIsValidDate(year, month, date);
                return <td
                    key={`${year} ${month} ${date}`}
                    className={
                        'date-cell '
                        + (isInCurrentMonth ? 'is-in-current-month ' : '')
                        + (isCurrentDate ? 'is-current-date ' : '')
                        + (isToday ? 'is-today ' : '')
                        + (isValid ? 'is-valid ' : '')
                    }
                >
                    <div onClick={() => isValid && updateCurrentYMD(year, month, date)}>
                        {date}
                    </div>
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
 * @param shownYear
 * @param shownMonth
 * @returns {Array}
 */
function createCalendar(currentYear, currentMonth, currentDate, shownYear, shownMonth) {

    const now = new Date();
    const calendar = [];
    const threeMonths = [[shownYear, shownMonth]];

    if (shownMonth == 0) {
        threeMonths.unshift([shownYear - 1, 11]);
        threeMonths.push([shownYear, 1]);
    } else if (shownMonth == 11) {
        threeMonths.unshift([shownYear, 10]);
        threeMonths.push([shownYear + 1, 0]);
    } else {
        threeMonths.unshift([shownYear, shownMonth - 1]);
        threeMonths.push([shownYear, shownMonth + 1]);
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
