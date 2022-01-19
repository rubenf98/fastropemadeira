import { Drawer, Row } from 'antd'
import React from 'react'
import styled from "styled-components";
import { dimensions } from "../../../../helper";
import moment from "moment";

const Container = styled(Drawer)`
.ant-drawer-content{
    background: rgb(255,255,255);
    background: -moz-linear-gradient(159deg, rgba(255,255,255,1) 0%, rgba(213,213,213,1) 100%);
    background: -webkit-linear-gradient(159deg, rgba(255,255,255,1) 0%, rgba(213,213,213,1) 100%);
    background: linear-gradient(159deg, rgba(255,255,255,1) 0%, rgba(213,213,213,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#d5d5d5",GradientType=1);
    
    ul{
        list-style: none;
        display: flex;
        flex-wrap: wrap;

        li  {
            color #535353;

            span {
                font-weight: bold;
                display: inline;
            }        
        }

        .details {
            width: 50%;
            margin: 5px 0px;

            span {
                font-weight: bold;
                display: block;
            }
        }

        
    }
}`;

const Participant = styled.div`{
    position: relative;
    width: 48%;
    margin: 10px 0px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,.1);
    padding: 10px;
    background: #fff;
    border-radius: 6px;
    

    .details-container{
        display: flex;
        margin-left: 65px;
        flex-wrap: wrap;

        p {
            margin: 5px 0px;
            width: 50%;

            img {
                width: 15px;
                margin-right: 5px;
            }
            
        }
    }

    .number{
        color: #8a8a8a;
        position: absolute;
        left: 10px;
        font-size: 50px;
        font-weight: bold;
        margin-top: auto;
        margin-bottom: auto;
        bottom: 0;
    }

    .gender{
        position: absolute;
        right: 10px;
        top: 10px;
        width: 12px;
    }

    
}`;

function DrawerContainer({ visible, onClose, record }) {
    return (
        <div>
            <Container width={600} placement="right" onClose={onClose} visible={visible}>
                {Object.keys(record).length &&
                    <div>
                        <h1>Resumo de Reserva</h1>
                        <ul>
                            <li className="details"><span >Nome</span> {record.name}</li>
                            <li className="details"><span>Email</span> {record.email}</li>
                            <li className="details"><span>Telemóvel</span> {record.phone}</li>
                            <li className="details"><span>Morada</span> {record.address}</li>
                            <li className="details"><span>Privado</span> {record.private ? "Sim" : "Não"}</li>
                            <li className="details"><span>Data</span> {record.date}</li>
                            <li className="details"><span>Atividade</span> {record.activity.name['pt']} ({record.experience.name['pt']})</li>
                            <li className="details"><span>Notas</span> {record.notes}</li>
                        </ul>
                        <h2>Participantes: {record.people}</h2>

                        <Row type="flex" justify='space-between'>
                            {record.participants.map((participant, key) => (
                                <Participant key={key}>
                                    <div className='number'>{key < 10 && "0"}{key + 1}</div>
                                    <img className='gender' src={"/icon/" + participant.gender + ".svg"} />
                                    <div className='details-container'>
                                        <p>
                                            <img src="/icon/dashboard/age.svg" alt="age" />{moment().diff(participant.birthday, 'years', false)}anos

                                        </p>
                                        <p>
                                            <img src="/icon/dashboard/height.svg" alt="height" />{participant.height}cm
                                        </p>
                                        <p>
                                            <img src="/icon/dashboard/weight.svg" alt="weight" />{participant.weight}
                                        </p>
                                        <p>
                                            <img src="/icon/dashboard/shoe.svg" alt="shoe" />{participant.shoe}EU
                                        </p>
                                    </div>
                                </Participant>
                            ))}
                        </Row>

                    </div>}


            </Container>
        </div>
    )
}

export default DrawerContainer
