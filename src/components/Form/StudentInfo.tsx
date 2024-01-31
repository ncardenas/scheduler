import { validGrades, validTopics } from '../../constants';
import { FormWrapper } from './FormWrapper';

type UserData = {
    firstName: string;
    lastName: string;
    grade: string;
    topic: string;
};
type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void;
};
export function StudentInfo({
    firstName,
    lastName,
    grade,
    topic,
    updateFields,
}: UserFormProps) {
    return (
        <FormWrapper title="Student Information">
            <label>First Name</label>
            <input
                autoFocus
                required
                type="text"
                value={firstName}
                onChange={(e) => updateFields({ firstName: e.target.value })}
            />
            <label>Last Name</label>
            <input
                autoFocus
                required
                type="text"
                value={lastName}
                onChange={(e) => updateFields({ lastName: e.target.value })}
            />
            <label>Grade</label>
            <select
                value={grade}
                onChange={(e) => updateFields({ grade: e.target.value })}
            >
                {validGrades.map((grade) => (
                    <option key={grade} value={grade}>
                        {grade}
                    </option>
                ))}
            </select>
            <label>Topic</label>
            <select
                value={topic}
                onChange={(e) => updateFields({ topic: e.target.value })}
            >
                {validTopics.map((topic) => (
                    <option key={topic} value={topic}>
                        {topic}
                    </option>
                ))}
            </select>
        </FormWrapper>
    );
}
