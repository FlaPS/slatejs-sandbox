import React from "react";
import { Popper, PopperProps, IconButton, Input } from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Link,
  Close
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.common.black
  },
  button: {
    borderRadius: 0,
    color: theme.palette.common.white,
    opacity: 0.75,
    "&:hover": {
      opacity: 1
    }
  },
  input: {
    color: theme.palette.common.white,
    padding: theme.spacing(1, 2)
  },
  close: {
    opacity: 0.75,
    cursor: "pointer",
    "&:hover": {
      opacity: 1
    }
  }
}));

export interface ToolbarProps extends Omit<PopperProps, "children"> {}

export function Toolbar(props: ToolbarProps) {
  const [link, setLink] = React.useState(null);
  const s = useStyles();

  return (
    <Popper className={s.root} {...props}>
      {link === null ? (
        /* Formatting controls */
        <React.Fragment>
          <IconButton className={s.button}>
            <FormatBold />
          </IconButton>
          <IconButton className={s.button}>
            <FormatItalic />
          </IconButton>
          <IconButton className={s.button}>
            <FormatUnderlined />
          </IconButton>
          <IconButton className={s.button} onClick={() => setLink("")}>
            <Link />
          </IconButton>
        </React.Fragment>
      ) : (
        /* URL input field */
        <form onSubmit={x => x.preventDefault()}>
          <Input
            className={s.input}
            type="url"
            value={link}
            onChange={x => setLink(x.target.value)}
            endAdornment={
              <Close className={s.close} onClick={() => setLink(null)} />
            }
            placeholder="https://"
            disableUnderline
            fullWidth
            autoFocus
          />
        </form>
      )}
    </Popper>
  );
}
