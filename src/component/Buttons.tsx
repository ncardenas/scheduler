import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export const SubmitButton = ({ handleSubmit }) => (
    <Grid item>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
            Submit
        </Button>
    </Grid>
)

export const ClearButton = ({ handleClear }) => (
    <Grid item>
        <Button variant="contained" color="primary" onClick={handleClear}>
            Clear
        </Button>
    </Grid>
)

export const UploadFileButton = ({ handleUploadFile }) => (
    <Grid item>
        <Button variant="contained" color="primary" onClick={handleUploadFile}>
            Upload File
        </Button>
    </Grid>
)