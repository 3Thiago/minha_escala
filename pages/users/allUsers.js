import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Tabletop from 'tabletop';
import AsideMenu from '../../components/AsideMenu';
import Loading from '../../components/Loading';
import styled, {keyframes} from 'styled-components';

const Container = styled.div`
    display: flex;

    width: 100%;

    background: #E6ECEF;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
`;

const CardsAnimation = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 100%;
    padding: 20px;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0;
        margin-top: 50px;
    }

    > img {
        width: 40px;
        cursor: pointer;
        transition: 0.3s;

        transition: 1s;

        &:hover {
            filter: saturate(30);
        }

        &:active ~ .cards{
            animation: ${CardsAnimation} 0.2s;
        }

        @media (max-width: 768px) {
            display: none;
        }
    }

    .arrow-plus {
        order: 2;
    }

    .cards {
        display: flex;
        justify-content: space-around;
        align-items: center;

        width: 100%;

        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;

            margin-bottom: 20px;
        }
    }

    .button-plus {
        display: none;
        margin-bottom: 20px;
        width: 50px;
        height: 50px;

        font-size: 25px;
        font-weight: bold;
        color: #00ACE0;
        background: #fff;

        border-radius: 50%;
        outline: none;
        border: 2px solid #00ACE0;


        @media (max-width: 768px) {
            display: inline;
        }
    }
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 300px;
    height: 400px;

    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px #00ACE0;
    cursor: pointer;

    @media (max-width: 768px) {
        margin-top: 80px;
    }

    img {
        width: 130px;
        height: 130px;

        margin-top: -80px;
        border-radius: 50%;

        box-shadow: 0 0 5px #00ACE0,
                    0 0 25px #00ACE0;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            color: #00ACE0;
            letter-spacing: 3px;
        }

        span {
            padding: 5px;
            font-size: 14px;
        }

        strong {
            text-align: center;
        }

        .services-count {
            width: 50px;
            padding: 10px;
            border-radius: 8px;
            background: #00ACE0;
            color: #fff;
            text-align: center;
            font-size: 20px;
        }
    }

    .dados-user {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }
`;

const screenStates = {
    LOADING: 'LOADING',
    READY: 'READY'
}

function AllUsers() {
    const [screenState, setScreenState] = useState(screenStates.LOADING);
    const [initial, setInitial] = useState(0);
    const [limit, setLimit] = useState(2);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.READY);
        }, 3000); // Exibe "Loading" por 3 segundos
    }, [screenState]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        }

        fetchUsers();
    }, []);

    const usersArrayLength = users.length;

    function changeLimitMinus() {
        if (limit > 2 && initial > 0) {
            setInitial(initial - 3);
            setLimit(limit - 3);
        } else {
            setInitial(usersArrayLength - 2);
            setLimit(usersArrayLength);
        }
    }

    function changeLimitPlus() {
        if (initial <= usersArrayLength - 3) {
            setInitial(initial + 3);
            setLimit(limit + 3);
        } else {
            setInitial(0);
            setLimit(2);
        }
    }

    function changeLimitPlusSmallScreen() {
        setLimit(limit + 3);
    }

    return (
        <Container>
            <AsideMenu />
            <ContentContainer>
                {screenState === screenStates.LOADING && <Loading />}

                {screenState === screenStates.READY && (
                    <>
                        <img src="/left-arrow.svg" onClick={changeLimitMinus} />
                        <img src="/right-arrow.svg" onClick={changeLimitPlus} className="arrow-plus" />

                        <div className="cards">
                            {users.map((user, index) => {
                                if (index >= initial && index <= limit) {
                                    return (
                                        <Link href={`/users/${user.name}`} className="linkToUser" key={user.name}>
                                            <Card>
                                                <img src={user.avatar} />
                                                <div>
                                                    <h2>{user.name}</h2>
                                                </div>
                                                <div className="dados-user">
                                                    <div>
                                                        <span>Posto</span>
                                                        <strong>{user.escala}</strong>
                                                    </div>
                                                    <div>
                                                        <span>Turma</span>
                                                        <strong>{user.team}</strong>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>Função Atual</span>
                                                    <strong>{user.responsability}</strong>
                                                </div>
                                                <div>
                                                    <span>Serviços</span>
                                                    <strong className="services-count">{user.services}</strong>
                                                </div>
                                            </Card>
                                        </Link>
                                    );
                                }
                            })}
                        </div>

                        {limit < usersArrayLength && <button className="button-plus" onClick={changeLimitPlusSmallScreen}>+</button>}
                    </>
                )}
            </ContentContainer>
        </Container>
    );
}

export default AllUsers;