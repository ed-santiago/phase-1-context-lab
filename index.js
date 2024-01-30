/* Your Code Here */
function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(records) {
    return records.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date
    }

    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date
    }

    this.timeOutEvents.push(timeOut);
    return this;
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(timeInEvent => timeInEvent.date === date);
    const timeOut = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const wageEarned = hoursWorked * this.payPerHour;
    return wageEarned;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employees, firstName) {
    const employee = employees.find(e => e.firstName === firstName)
    return employee;
}

function calculatePayroll(employees) {
    const payroll = employees.reduce((total, employee) => {
        return total + allWagesFor.call(employee)
    }, 0)

    return payroll;
}