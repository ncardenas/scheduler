export interface Option {
    start: number;
    end: number;
}

export function createMeetingOptions(mins: number) {
    const meetingHours = Math.floor(mins / 60);
    const meetingMins = mins % 60;

    let startHours = 0;
    let startMins = 0;
    let endHours = 0;
    let endMins = 0;

    const items: Option[] = [];
    // Loop: 0-24:00
    while (startHours < 24) {
        // End = Start + Meeting Duration
        const totalMins = startMins + meetingMins;
        endMins = totalMins % 60;
        endHours = startHours + meetingHours + Math.floor(totalMins / 60);

        const totalStart = startHours * 60 + startMins;
        const totalEnd = endHours * 60 + endMins;

        const newOption: Option = {
            start: totalStart,
            end: totalEnd,
        };

        items.push(newOption);

        // Start = End
        startMins = endMins;
        startHours = endHours;
    }

    return items;
}

function addPadding(arg: number) {
    return arg.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}

export function timeToString(time: number) {
    return `${addPadding(time / 60)}:${addPadding(time % 60)}`;
}

export function optionToString(option: Option) {
    return `${timeToString(option.start)} to ${timeToString(option.end)}`;
}
