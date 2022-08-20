import React, {useState} from 'react'
import {Button, Card, Form} from "react-bootstrap";

import axios from "axios";
import styles from "../../styles/Home.module.css";
import {router} from "next/client";

async function onAgendaAddSubmit(value) {
  const data = {title: value}
  axios.post('/api/agenda/add', data)
    .then(() => {
      console.log(value)
    })
    .catch((e) => {
      console.error(e)
    })

}

async function onAgendaClearSubmit() {
  axios.post('/api/agenda/clear')
    .then(() => {
    })
    .catch((e) => {
      console.error(e)
    })
}

async function onAgendaRemoveSubmit() {

}

export default function AgendaCard({ pointsOfOrder }) {
  const [agendaItem, setAgendaItem] = useState('')

  return <Card className={styles.card} id={'agenda'}>
    <Card.Title>Agenda</Card.Title>

    <Card.Body>
      <Form id={"pointsOfOrder"}>
        {pointsOfOrder.map((item, idx) => {
          return <Form.Check type={"checkbox"} id={item.title} label={item.title} key={idx}/>
        })}
      </Form>
    </Card.Body>

    <Card.Footer>
      <fieldset>
        <label htmlFor={"agendaitem"}>Agenda Item Input:</label><br/>
        <input type={"text"} id={"agendaitem"} name={"agendaitem"} value={agendaItem} onChange={e => setAgendaItem(e.target.value)}/><br/>
      </fieldset>
      <br/>

      <Button className={styles.button}
              variant={"outline-success"}
              onClick={() => {
                onAgendaAddSubmit(agendaItem);
                router.push('/admin#agenda')
              }}>
        Add Agenda Item
      </Button>

      <Button className={styles.button} variant={"outline-danger"}>
        Remove Agenda Items
      </Button>

      <Button className={styles.button}
              variant={"danger"}
              onClick={() => {
                onAgendaClearSubmit()
                router.push('/admin#agenda')
              }
      }>
        Clear Agenda
      </Button>

    </Card.Footer>
  </Card>
}
