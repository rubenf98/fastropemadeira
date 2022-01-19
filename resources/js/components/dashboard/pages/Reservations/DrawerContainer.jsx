import { Drawer } from 'antd'
import React from 'react'
import styled from "styled-components";
import { dimensions } from "../../../../helper";

const Container = styled(Drawer)`

`;

function DrawerContainer({ visible, onClose, record }) {
    return (
        <div>
            <Container width={550} title="Resumo de Reserva" placement="right" onClose={onClose} visible={visible}>
                {Object.keys(record).length &&
                    <div>
                        <ul>
                            <li>Nome: {record.name}</li>
                            <li>Email: {record.email}</li>
                            <li>Telemóvel: {record.phone}</li>
                            <li>Morada: {record.address}</li>
                            <li>Privado: {record.private ? "Sim" : "Não"}</li>
                            <li>Data: {record.date}</li>
                            <li>Atividade: {record.activity.name['pt']} ({record.experience.name['pt']})</li>
                            <li>Notas: {record.notes}</li>
                        </ul>
                        <h2>Participantes: {record.people}</h2>

                        <ul>
                            {record.participants.map((participant, key) => (
                                <li key={key}>Participante {key + 1}: {participant.birthday} / {participant.gender} / {participant.weight} / {participant.height}cm / {participant.shoe} EU</li>
                            ))}

                        </ul>
                    </div>}


            </Container>
        </div>
    )
}

export default DrawerContainer
