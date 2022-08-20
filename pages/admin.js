import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import {Container, Form, Navbar, Offcanvas} from 'react-bootstrap'
import styles from '../styles/Home.module.css'

import Hamburger from 'hamburger-react'
import Link from "next/link";

import AgendaCard from "../components/admin/AgendaCard";
import SpeakerCard from "../components/admin/SpeakerCard";
import VotingAdminCard from "../components/admin/VotingAdminCard";
import VotingHistoryAdminCard from "../components/admin/VotingHistoryAdminCard";

export default function Admin() {
  /**
   * Managing of the Hamburger Menu
   */
  const [isOpen, setOpen] = useState(false)
  const handleToggle = () => {
    if (isOpen) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  /**
   * Retrieving Data for the Cards
   */
  const [refreshToken, setRefreshToken] = useState(Math.random())
  const [agendaItems, setAgendaItems] = useState([])
  const [speakersItems, setSpeakersItems] = useState([])
  const [motionItems, setMotionsItems] = useState([])
  useEffect(() => {
    async function load() {
      const agendaResponse = await fetch('/api/agenda/retrieve');
      const agendaItems = await agendaResponse.json();
      setAgendaItems(agendaItems)

      const speakersResponse = await fetch('/api/speakers/retrieve');
      const speakersItems = await speakersResponse.json();
      setSpeakersItems(speakersItems)

      const motionResponse = await fetch('/api/voting/retrieve');
      const motionItems = await motionResponse.json();
      setMotionsItems(motionItems)
    }

    load().then(setTimeout(() => setRefreshToken(Math.random()), 2500))
  }, [refreshToken])

  return (
    <>
      <Head>
        <title>AssemblyVoting</title>
        <meta name="description" content="Digital Voting for Assembly's by Neuland Ingolstadt"/>
        <link rel="icon" href="https://assets.neuland.app/StudVer_Logo_ohne%20Schrift.svg"/>
      </Head>

      <Navbar bg="light" variant="light">
        <Container>
          <Link href="../">
            <Navbar.Brand>
              <img
                src="https://assets.neuland.app/StudVer_Logo_ohne%20Schrift.svg"
                alt="Studierendenvertretung TH Ingolstadt"
                className={`d-inline-block align-top ${styles.logo}`}
              />{' '}
              AssemblyVoting
            </Navbar.Brand>
          </Link>
          <Hamburger toggled={isOpen} onToggle={setOpen}/>
        </Container>

        <Offcanvas show={isOpen} onHide={handleToggle} placement={'end'}>
          <Offcanvas.Body className={styles.navbar}>
            <>
              <li>
                <Hamburger toggled={isOpen} onToggle={setOpen}/>
              </li>
              <li>
                <Link href="../">
                  <h4>Dashboard</h4>
                </Link>
              </li>
              <li>
                <Link href="agenda">
                  <h4>Agenda</h4>
                </Link>
              </li>
              <li>
                <Link href="votinghistory">
                  <h4>Voting History</h4>
                </Link>
              </li>
              <li>
                <Link href="admin">
                  <h4>Administration</h4>
                </Link>
              </li>
              <li>
                <Form.Check
                  type="checkbox"
                  id="stay-logged-in"
                  label="Anwesend"
                  /**onChange*/
                />
              </li>
            </>
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>

      <>
        <AgendaCard pointsOfOrder={agendaItems}/>

        <SpeakerCard speakerItems={speakersItems}/>

        <VotingAdminCard/>

        <VotingHistoryAdminCard votingItems={motionItems}/>

      </>
    </>
  )
}
