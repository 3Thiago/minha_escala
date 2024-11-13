import React, { useEffect, useState } from 'react';
import AsideMenu from '../../components/AsideMenu';
import WindowContainer from '../../components/WindowContainer';
import { LineRed, LineBlack } from '../../components/LineContainer';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100%;
    background: #E6ECEF;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0;
        margin-bottom: 70vh;
    }
`;

export default function User({ username }) {
    const [servicesOfUser, setServicesOfUser] = useState([]);

    const usernameModified = username[0].toUpperCase() + username.substr(1);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await fetch(`/api/services/${username}`);
                const data = await response.json();
                setServicesOfUser(data);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        }

        fetchServices();
    }, [username]);

    return (
        <Container>
            <AsideMenu/>
            <ContentContainer>
                <WindowContainer title={`Todos os serviços: ${usernameModified}`}>
                    {servicesOfUser.map(service => {
                        if(service.escala === 'preta') {
                            return (
                                <LineBlack
                                    key={service.id}
                                    avatar={service.avatar}
                                    name={service.user}
                                    grad={service.grad}
                                    date={service.data}
                                />
                            );
                        } else {
                            return (
                                <LineRed
                                    key={service.id}
                                    avatar={service.avatar}
                                    name={service.user}
                                    grad={service.grad}
                                    date={service.data}
                                />
                            );
                        }
                    })}
                </WindowContainer>
            </ContentContainer>
        </Container>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            username: context.params.id,
        },
    };
}
