import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AsideMenu from '../components/AsideMenu';
import WindowContainer from '../components/WindowContainer';
import Loading from '../components/Loading';
import { LineRed, LineBlack } from '../components/LineContainer';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
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
        flex-direction: column-reverse;
        height: 100%;
        margin-top: 50px;
    }
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 70vh;

    @media (max-width: 768px) {
        height: 100%;
    }
`;

const screenStates = {
    LOADING: 'LOADING',
    READY: 'READY'
};

function Home() {
    const [screenState, setScreenState] = useState(screenStates.LOADING);
    const [isServiceToday, setIsServiceToday] = useState(null);
    const [isServiceTomorrow, setIsServiceTomorrow] = useState(null);
    const [serviceScale, setServiceScale] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.READY);
        }, 3000);
    }, [screenState]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/services'); // endpoint da API
                const data = await response.json();
                console.log("Dados do serviço1:", data);
    
                // Substituindo .find para encontrar quem está de serviço hoje
                let whoIsServiceToday = null;
                for (let service of data) {
                    if (service.today === "sim") {
                        whoIsServiceToday = service;
                        console.log("Serviço hoje encontrado:", whoIsServiceToday);
                        break;
                    }
                }
                setIsServiceToday(whoIsServiceToday);
    
                // Verificando o próximo serviço para o "serviço de amanhã"
                let whoIsServiceTomorrow = null;
                if (whoIsServiceToday) {
                    for (let service of data) {
                        if (service.id === whoIsServiceToday.id + 1) {
                            whoIsServiceTomorrow = service;
                            break;
                        }
                    }
                }
                setIsServiceTomorrow(whoIsServiceTomorrow);
    
                // Filtrando os últimos quatro serviços
                const scaleSize = data.length;
                const servicesModificated = data.slice(scaleSize - 4);
                setServiceScale(servicesModificated);
            } catch (error) {
                console.error("Erro ao buscar dados do serviço:", error);
            }
        }
    
        fetchData();
    }, []);

    return (
        <Container>
            <AsideMenu />
            <ContentContainer>
                {screenState === screenStates.LOADING && <Loading />}

                {screenState === screenStates.READY && (
                    <>
                        <LeftContainer>
                            <WindowContainer title="Escala de serviço">
                                {serviceScale.map(service => (
                                    service.escala === 'preta' ? (
                                        <LineBlack
                                            key={service.user}
                                            avatar={service.avatar}
                                            name={service.user}
                                            grad={service.grad}
                                            date={service.data}
                                        />
                                    ) : (
                                        <LineRed
                                            key={service.user}
                                            avatar={service.avatar}
                                            name={service.user}
                                            grad={service.grad}
                                            date={service.data}
                                        />
                                    )
                                ))}
                            </WindowContainer>
                        </LeftContainer>
                        <RightContainer>
                            <WindowContainer title="Serviço hoje">
                                {isServiceToday && (isServiceToday.escala === 'preta' ? (
                                    <LineBlack
                                        avatar={isServiceToday.avatar}
                                        name={isServiceToday.user}
                                        grad={isServiceToday.grad}
                                        date={isServiceToday.data}
                                    />
                                ) : (
                                    <LineRed
                                        avatar={isServiceToday.avatar}
                                        name={isServiceToday.user}
                                        grad={isServiceToday.grad}
                                        date={isServiceToday.data}
                                    />
                                ))}
                            </WindowContainer>

                            <WindowContainer title="Serviço amanhã">
                                {isServiceTomorrow && (isServiceTomorrow.escala === 'preta' ? (
                                    <LineBlack
                                        avatar={isServiceTomorrow.avatar}
                                        name={isServiceTomorrow.user}
                                        grad={isServiceTomorrow.grad}
                                        date={isServiceTomorrow.data}
                                    />
                                ) : (
                                    <LineRed
                                        avatar={isServiceTomorrow.avatar}
                                        name={isServiceTomorrow.user}
                                        grad={isServiceTomorrow.grad}
                                        date={isServiceTomorrow.data}
                                    />
                                ))}
                            </WindowContainer>
                        </RightContainer>
                    </>
                )}
            </ContentContainer>
        </Container>
    );
}

export default Home;
