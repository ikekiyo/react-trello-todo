import * as React from 'react'
import Board from 'react-trello'

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', metadata: { sha: 'be312a1' } },
        { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } },
        { id: 'Card3', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}
let eventBus = undefined

const setEventBus = (handle) => {
  eventBus = handle
}
//To add a card
eventBus.publish({ type: 'ADD_CARD', laneId: 'COMPLETED', card: { id: "M1", title: "Buy Milk", label: "15 mins", description: "Also set reminder" } })

//To remove a card
eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: "M1" })

//To move a card from one lane to another. index specifies the position to move the card to in the target lane
eventBus.publish({ type: 'MOVE_CARD', fromLaneId: 'PLANNED', toLaneId: 'WIP', cardId: 'Plan3', index: 0 })

//To update the lanes
eventBus.publish({ type: 'UPDATE_LANES', lanes: newLaneData })


export default class App extends React.Component {
  render () {
    return (
      <>
        <Board data={data} />
        <Board data={data} eventBusHandle={setEventBus} />
      </>
    )
  }
}
