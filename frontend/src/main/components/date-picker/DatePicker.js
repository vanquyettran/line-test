import './DatePicker.less';
import React from 'react';
import {translate} from '../../i18n';
import Icon from '../../components/icon/Icon';


export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        const dateObject = new Date(props.defaultDate);
        this.state = {};
        this.state.current = !isNaN(dateObject.getTime()) ? dateObject : new Date(),
        this.state.shownYear = this.getCurrentYear();
        this.state.shownMonthIndex = this.getCurrentMonthIndex();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.date === undefined) {
            return null;
        }

        const dateObject = new Date(props.date);

        if (isNaN(dateObject.getTime())) {
            return null;
        }
        if (state.current.getTime() === dateObject.getTime()) {
            return null;
        }

        state.current = dateObject;
        state.shownYear = dateObject.getFullYear();
        state.shownMonthIndex = dateObject.getMonth();

        return state;
    }

    /**
     * @return {number}
     */
    getCurrentYear = () => this.state.current.getFullYear();

    /**
     * @return {number}
     */
    getCurrentMonthIndex = () => this.state.current.getMonth();

    /**
     * @return {number}
     */
    getCurrentDate = () => this.state.current.getDate();

    setCurrentYear = year => this.state.current.setFullYear(year);

    setCurrentMonthIndex = monthIndex => this.state.current.setMonth(monthIndex);

    setCurrentDate = date => this.state.current.setDate(date);

    updateCurrentYMD = (year, monthIndex, date) => {
        this.setCurrentYear(year);
        this.setCurrentMonthIndex(monthIndex);
        this.setCurrentDate(date);
        this.resetShownYearMonth();

        setTimeout(this.pushChange, 0);
    };

    pushChange = () => {
        this.props.onChange([
            this.getCurrentYear(),
            this.getCurrentMonthIndex() + 1,
            this.getCurrentDate()
        ]);
    };

    resetShownYearMonth = () => {
        this.setState({
            shownYear: this.getCurrentYear(),
            shownMonthIndex: this.getCurrentMonthIndex()
        });
    };

    getCalendar = () => {
        const {
            shownYear,
            shownMonthIndex
        } = this.state;

        return createCalendar(
            shownYear,
            shownMonthIndex,
            this.getCurrentYear(),
            this.getCurrentMonthIndex(),
            this.getCurrentDate()
        );
    };

    showPrevMonth = () => {
        this.setState(({shownYear, shownMonthIndex}) => {
            if (shownMonthIndex === 0) {
                shownMonthIndex = 11;
                shownYear--;
            } else {
                shownMonthIndex--;
            }
            return {shownYear, shownMonthIndex};
        });
    };

    showNextMonth = () => {
        this.setState(({shownYear, shownMonthIndex}) => {
            if (shownMonthIndex === 11) {
                shownMonthIndex = 0;
                shownYear++;
            } else {
                shownMonthIndex++;
            }
            return {shownYear, shownMonthIndex};
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
            shownMonthIndex
        } = this.state;

        return <div className="date-picker">
            <table>
                <tbody>
                {
                    getYearMonthRow(
                        yearMonthTemplate, shownYear,
                        shownMonthIndex, months, shortMonths,
                        this.showPrevMonth, this.showNextMonth
                    )
                }
                {
                    getWeekdaysRow(shortWeekdays)
                }
                {
                    this.getCalendar().map(
                        weekInfo => getWeekRow(weekInfo, getIsValidDate, this.updateCurrentYMD)
                    )
                }
                </tbody>
            </table>
        </div>;
    }
}


DatePicker.defaultProps = {
    date: undefined,
    defaultDate: new Date().getTime(),
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
        return true;

        // example for preventing users select a date in the past
        // return new Date(year, month, date, 23, 59, 59).getTime() >= new Date().getTime();
    },
    onChange: (value) => console.log('(DatePicker) onChange is omitted', value)
};


/**
 *
 * @param {string} yearMonthTemplate
 * @param {number} shownYear
 * @param {number} shownMonthIndex
 * @param {string[]} months
 * @param {string[]} shortMonths
 * @param {function|null} showPrevMonth
 * @param {function|null} showNextMonth
 */
function getYearMonthRow(yearMonthTemplate, shownYear, shownMonthIndex, months, shortMonths, showPrevMonth, showNextMonth) {
    return <tr className="year-month-row">
        <td className="month-backward-cell">
            {
                showPrevMonth &&
                <div onClick={() => showPrevMonth()}>
                    <Icon name="angle-left"/>
                </div>
            }
        </td>
        <td className="year-month-cell" colSpan="5">
            <div>
                {
                    yearMonthTemplate
                        .replace(/\{year\}/g, '' + shownYear)
                        .replace(/\{month\}/g, months[shownMonthIndex])
                        .replace(/\{shortMonth\}/g, shortMonths[shownMonthIndex])
                }
            </div>
        </td>
        <td className="month-forward-cell">
            {
                showNextMonth &&
                <div onClick={() => showNextMonth()}>
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
 * @param {{year, monthIndex, date, isInCurrentMonth, isCurrentDate, isToday}[]} dateInfoList
 * @param {function} getIsValidDate
 * @param {function} updateCurrentYMD
 * @returns {Component}
 */
function getWeekRow(dateInfoList, getIsValidDate, updateCurrentYMD) {
    return <tr className="week-row">
        {
            dateInfoList.map(({year, monthIndex, date, isInCurrentMonth, isCurrentDate, isToday}) => {
                const isValid = getIsValidDate(year, monthIndex + 1, date);
                return <td
                    key={`${year} ${monthIndex} ${date}`}
                    className={
                        'date-cell '
                        + (isInCurrentMonth ? 'is-in-current-month ' : '')
                        + (isCurrentDate ? 'is-current-date ' : '')
                        + (isToday ? 'is-today ' : '')
                        + (isValid ? 'is-valid ' : '')
                    }
                >
                    <div onClick={() => isValid && updateCurrentYMD(year, monthIndex, date)}>
                        {date}
                    </div>
                </td>;
            })
        }
    </tr>
}


/**
 *
 * @param shownYear
 * @param shownMonthIndex
 * @param currentYear
 * @param currentMonthIndex
 * @param currentDate
 * @returns {Array}
 */
function createCalendar(shownYear, shownMonthIndex, currentYear, currentMonthIndex, currentDate) {

    const now = new Date();
    const calendar = [];
    const threeMonths = [[shownYear, shownMonthIndex]];

    if (shownMonthIndex == 0) {
        threeMonths.unshift([shownYear - 1, 11]);
        threeMonths.push([shownYear, 1]);
    } else if (shownMonthIndex == 11) {
        threeMonths.unshift([shownYear, 10]);
        threeMonths.push([shownYear + 1, 0]);
    } else {
        threeMonths.unshift([shownYear, shownMonthIndex - 1]);
        threeMonths.push([shownYear, shownMonthIndex + 1]);
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
                monthIndex: item[1],
                date: i,
                isInCurrentMonth: index == 1,
                isCurrentDate: item[0] == currentYear && item[1] == currentMonthIndex && i == currentDate,
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
