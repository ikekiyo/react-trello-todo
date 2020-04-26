import * as React from 'react'
import Board from 'react-trello'
import { Box, Button, TextField } from '@material-ui/core'
import data from '../data.json'
import { makeStyles } from '@material-ui/core/styles'

let eventBus = undefined

const setEventBus = (handle) => {
  eventBus = handle
}
const useStyles = makeStyles(() => ({
  form: {
    margin: '10px',
  },
  description: {
    marginLeft: '10px'
  }
}))
const App = () => {
  const [taskName, setTaskName] = React.useState('')
  const [taskDescription, setTaskDescription] = React.useState('')
  const classes = useStyles()
  const addTaskHandler = (event) => {
    eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'PLANNED',
      card: {
        id: Date.now(),
        title: taskName,
        label: '30 mins',
        description: taskDescription,
      },
    })
  }

  const setText = (event) => {
    setTaskName(event.target.value)
  }
  return (
    <>
      <Box m={1} display="flex" className={classes.form}>
        <form>
          <TextField
            label="タスク名"
            variant="standard"
            onChange={(event) => {
              setTaskName(event.target.value)
            }} />
          <TextField
            label="タスク詳細"
            variant="standard"
            onChange={(event) => {
              setTaskDescription(event.target.value)
            }}
            className={classes.description}
          />
          <Button variant="contained" color="primary" onClick={addTaskHandler}>登録</Button>
        </form>
      </Box>
      <Board data={data} eventBusHandle={setEventBus} />
    </>
  )
}


export default App
