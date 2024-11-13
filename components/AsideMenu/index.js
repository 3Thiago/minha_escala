import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const AsideContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 130px;
    height: 100vh;
    margin-right: 0px;

    background: #fff;

    box-shadow: 0 0 5px #00ACE0,
                0 0 10px #00ACE0;

    border-bottom-right-radius: 8px;

    @media (max-width: 768px) {
        width: 100vw;
        height: 60px;

        display: flex;
        flex-direction: row;
        justify-content: space-around;

        box-shadow: none;
        border: none;
        border-bottom-right-radius: 0px;
    }

    .logo {
        display: flex;
        align-items: center;
        flex-direction: column;

        border-bottom: 2px solid #00ACE0;
        cursor: pointer;
        
        @media (max-width: 768px) {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            border: none;
        }

        div {
            display: flex;
            align-items: center;

            letter-spacing: 2px;
            
            span {
                font-size: 45px;
                font-style: italic;
                color: #00ACE0;

                @media (max-width: 768px) {
                    font-size: 35px;
                }
            }

            strong {
                font-size: 45px;
                font-style: italic;
                color: #00ACE0;

                @media (max-width: 768px) {
                    font-size: 50px;
                }
            }
        }

        p {
            font-style: italic;
            font-size: 12px;
            color: #00ACE0;
            wei

            margin-top: -10px;

            @media (max-width: 768px) {
                margin: 0;
                margin-left: 5px;
            }
        }
    }

    .menu-items {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        margin-top: 80px;

        @media (max-width: 768px) {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;

            margin-top: 0;
            width: 150px;
        }
    }
`;

const Icon = styled.div`
            margin-bottom: 30px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            border-bottom:  ${props => props.selected && css`3px solid #00ACE0`};
            border-radius: 4px;

            transition: 0.3s;

            &:hover {
                border-bottom: 3px solid #00ACE0;
            }

            @media (max-width: 768px) {
                display: flex;
                flex-direction: row;

                margin-bottom: 0;
                margin-right: 10px;
                padding: 0;
            }
`;

export default function AsideMenu() {

    const [escalePage, setEscalePage] = useState(false);
    const [cardsPage, setCardsPage] = useState(false);
    const [rankingPage, setRankingPage] = useState(false);

    useEffect(() => {
        const location = window.location.href;

        console.log(location.length);

        if (location.indexOf("allUsers") > 0) setCardsPage(true);
        if (location.indexOf("ranking") > 0) setRankingPage(true);
        if (location.indexOf("allUsers") < 0 && location.indexOf("ranking") < 0 && location.indexOf("users") < 0) setEscalePage(true);
        if (location.indexOf("allUsers") < 0 && location.indexOf("ranking") < 0 && location.indexOf("users") > 0) setCardsPage(true);
    }, [])

    return (
        <AsideContainer>

            <Link href="/">
                <div className="logo">
                    <div><span>M</span><strong>E</strong></div>
                    <p>Minha Escala</p>
                </div>
            </Link>

            <div className="menu-items">
                <Icon selected={escalePage}>
                    <Link href="/">
                        <Image src="/calendar.svg" width={35} height={35} alt="calendar icon"/>
                    </Link>
                </Icon>

                <Icon selected={cardsPage}>
                    <Link href="/users/allUsers">
                        <Image src="/user.svg" width={35} height={35} alt="user icon"/>
                    </Link>
                </Icon>

                <Icon selected={rankingPage}>
                    <Link href="/users/ranking">
                        <Image src="/stage.svg" width={35} height={35} alt="stage icon"/>
                    </Link>
                </Icon>
            </div>
        </AsideContainer>
    )
}