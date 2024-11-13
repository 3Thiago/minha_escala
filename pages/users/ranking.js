import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AsideMenu from '../../components/AsideMenu';
import WindowContainer from '../../components/WindowContainer';
import { Container as ContainerLineRanking } from '../../components/LineContainer';
import Loading from '../../components/Loading';

const Container = styled.div`
    display: flex;
    width: 100%;
    background: #E6ECEF;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        margin-top: 50px;
        margin-bottom: 10vh;
    }
`;

const screenStates = {
    LOADING: 'LOADING',
    READY: 'READY'
};

export default function Ranking() {
    const [screenState, setScreenState] = useState(screenStates.LOADING);
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.READY);
        }, 3000); // Exibe "Loading" por 3 segundos
    }, [screenState]);

    useEffect(() => {
        async function fetchRanking() {
            try {
                const response = await fetch('/api/ranking');
                const data = await response.json();
                setRanking(data);
            } catch (error) {
                console.error("Erro ao buscar ranking:", error);
            }
        }

        fetchRanking();
    }, []);

    return (
        <Container>
            <AsideMenu />
            <ContentContainer>
                {screenState === screenStates.LOADING && <Loading />}

                {screenState === screenStates.READY && (
                    <WindowContainer title="Ranking">
                        {ranking.map((user, index) => {
                            return (
                                <ContainerLineRanking
                                    key={user.name}
                                    ranking
                                    first={index === 0}
                                    second={index === 1}
                                    third={index === 2}
                                >
                                    <div className="avatar-name-grad">
                                        <strong>{`#${index + 1}`}</strong>
                                        <img src={user.avatar} alt={`Avatar de ${user.name}`} />
                                        <div className="name-grad">
                                            <p>{user.name}</p>
                                            <p>{user.grad}</p>
                                        </div>
                                    </div>
                                    <div className="qtdservices-column">
                                        <span>{user.services}</span>
                                    </div>
                                </ContainerLineRanking>
                            );
                        })}
                    </WindowContainer>
                )}
            </ContentContainer>
        </Container>
    );
}
