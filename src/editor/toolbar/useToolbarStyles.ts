import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(theme => ({
    root: {
        background: theme.palette.common.black,
    },
    button: {
        borderRadius: 0,
        // color: theme.palette.common.white,
        opacity: 0.75,
        '&:hover': {
            opacity: 1,
        },
        '&$selected': {
            color: 'green',
        },

    },

    input: {
        color: theme.palette.common.white,
        padding: theme.spacing(1, 2),
    },

    close: {
        opacity: 0.75,
        cursor: 'pointer',
        '&:hover': {
            opacity: 1,
        },
    },
}))
