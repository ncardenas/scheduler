export interface Option {
    menuItem: React.JSX.Element;
    strStart: string;
    strEnd: string;
    start: number;
    end: number;
}
function createOption(
    startHours: number,
    startMins: number,
    endHours: number,
    endMins: number
) {
    function addPadding(arg: number) {
        return arg.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
    }
    const strStart = `${addPadding(startHours)}:${addPadding(startMins)}`;
    const strEnd = `${addPadding(endHours)}:${addPadding(endMins)}`;
    const menuText = `${strStart} to ${strEnd}`;
    const totalStart = startHours * 60 + startMins;
    const totalEnd = endHours * 60 + endMins;

    const menuItem = (
        <option key={menuText} value={menuText}>
            {menuText}
        </option>
    );
    const option: Option = {
        menuItem: menuItem,
        strStart: strStart,
        strEnd: strEnd,
        start: totalStart,
        end: totalEnd,
    };
    return option;
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

        const newOption = createOption(
            startHours,
            startMins,
            endHours,
            endMins
        );
        items.push(newOption);

        // Start = End
        startMins = endMins;
        startHours = endHours;
    }

    return items;
}
