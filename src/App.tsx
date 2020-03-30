import React from 'react'
import { Card, CardContent, Container, CssBaseline, MuiThemeProvider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import theme from './theme'
import { WorkoutEditorView, WorkoutNode } from './editor/'


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  title: {
    margin: theme.spacing(0, 2, 2),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}))

const initialValue: WorkoutNode[] = [
    {
        type: "paragraph",
        children: [{ text: "" }]
    }
]

export const App = () => {
  const [value, setValue] = React.useState(initialValue)
  const s = useStyles()

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={s.root} maxWidth='sm'>
        <Typography className={s.title} component='h1' variant='h5'>
          Slate.js Sandbox
        </Typography>
        <Card className={s.card} elevation={0}>
          <CardContent>
            <WorkoutEditorView
              value={value}
              onChange={setValue}
              placeholder='Write text here...'
              autoFocus
              spellCheck
            />
          </CardContent>
        </Card>
      </Container>
        {/*
            <Rjv
                data={value}
                shouldExpandNode={() => true}
            />*/
        }
    </MuiThemeProvider>
  )
}
