import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export const IDField = (handleInputChange: Function) => {
    return (
        <Grid item>
            <TextField
                id="id-field"
                name="ID"
                label="ID"
                type="text"
                onChange={() => handleInputChange()}
            />
        </Grid>
    )
}
export const NameField = (handleInputChange: Function) => {
    return (
    <Grid item>
        <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            onChange={() => handleInputChange()}
        />
    </Grid>
    )
}

export const GradeField = (handleInputChange: Function) => {
    return (
        <Grid item>
            <TextField
                id="grade-input"
                name="grade"
                label="Grade"
                type="number"
                onChange={() => handleInputChange()}
            />
        </Grid>
    )
}
