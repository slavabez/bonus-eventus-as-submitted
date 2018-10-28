import React, { Component } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import appStore from "../stores/appStore";

//#region styled components
const Wrapper = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  padding: 1.5rem;
  height: 90%;
  grid-template-areas:
    "lp dp dp dp dp dp dp rp"
    "lp hp hp hp hp hp hp rp"
    "lp hp hp hp hp hp hp rp"
    "lp hp hp hp hp hp hp rp";
`;
const LeftPane = styled.div`
  grid-area: lp;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  align-items: start;
  justify-content: center;
  overflow-y: auto;
  max-height: 80%;
`;
const DicePane = styled.div`
  grid-area: dp;
  background-color: white;
  border-radius: 1rem;
`;
const History = styled.div`
  grid-area: hp;
`;
const RightPane = styled.div`
  grid-area: rp;
`;

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-top: 1rem;
`;
const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
`;
const Avatar = styled.img`
  max-width: 80px;
  border-radius: 50%;
  border: 6px solid ${props => props.color};
`;
const Name = styled.span`
  font-size: 1.3rem;
  color: ${props => props.color};
`;

const HistoryWrapper = styled.div``;
const RollMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.2rem;
`;
const MessageAvatar = styled.img`
  max-width: 50px;
  border-radius: 50%;
  border: 6px solid ${props => props.color};
`;
const MessageBody = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  margin-left: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${props => props.color}
  font-size: 1.1rem;
`;
const RollAsString = styled.span`
  margin-right: 1rem;
`;
const RollBreakdown = styled.span``;
const RollTotal = styled.span`
  color: #47cead;
  text-decoration: underline;
  margin-left: 0.5rem;
`;
//#endregion

const fakePlayers = [
  {
    name: "Steven",
    avatar: "/images/monk_100.png",
    color: "#FF6D4E",
    id: "someid"
  },
  {
    name: "Alyona",
    avatar: "/images/cleric_100.png",
    color: "#FFCE48"
  },
  {
    name: "Rich",
    avatar: "/images/warlock_100.png",
    color: "#219CEE"
  },
  {
    name: "Steven",
    avatar: "/images/monk_100.png",
    color: "#626262"
  },
  {
    name: "Alyona",
    avatar: "/images/cleric_100.png",
    color: "#FFCE48"
  },
  {
    name: "Rich",
    avatar: "/images/warlock_100.png",
    color: "#219CEE"
  },
  {
    name: "Steven",
    avatar: "/images/monk_100.png",
    color: "#626262"
  }
];

const fakeMessages = [
  {
    author: {
      name: "Rich",
      avatar: "/images/warlock_100.png",
      color: "#219CEE"
    },
    total: 12,
    rollString: "1d20",
    rolls: [
      {
        order: 1,
        sides: 20,
        result: 12
      }
    ],
    createdAt: new Date()
  },
  {
    author: {
      name: "Steven",
      avatar: "/images/monk_100.png",
      color: "#626262"
    },
    total: 14,
    rollString: "2d10",
    rolls: [
      {
        order: 1,
        sides: 10,
        result: 6
      },
      {
        order: 2,
        sides: 10,
        result: 8
      }
    ],
    createdAt: new Date()
  }
];

class RoomView extends Component {
  renderPlayers = () => {
    return fakePlayers.map(p => (
      <Player>
        <Avatar src={p.avatar} alt={p.name} color={p.color} />
        <Name color={p.color}>
          {p.name} {p.id ? "(You)" : ""}
        </Name>
      </Player>
    ));
  };

  renderRollHistory = () => {
    return fakeMessages.map(m => {
      // Construct the message object
      const avatar = (
        <MessageAvatar
          src={m.author.avatar}
          alt={m.author.name}
          title={m.author.name}
          color={m.author.color}
        />
      );
      // If only one roll - don't show roll breakdown
      // use a reducer to get the values
      const breakdown =
        m.rolls.length !== 1
          ? m.rolls.reduce((a, v) => a.result + " + " + v.result) + " = "
          : null;

      const body = (
        <MessageBody color={m.author.color} title={m.createdAt.toTimeString()}>
          <RollAsString>{m.rollString}: </RollAsString>
          <RollBreakdown>{breakdown}</RollBreakdown>
          <RollTotal>{m.total}</RollTotal>
        </MessageBody>
      );

      return (
        <RollMessage>
          {avatar}
          {body}
        </RollMessage>
      );
    });
  };

  render() {
    return (
      <Wrapper>
        <LeftPane>
          <PlayerList>{this.renderPlayers()}</PlayerList>
        </LeftPane>
        <DicePane>Dice Pane</DicePane>
        <History>
          <HistoryWrapper>{this.renderRollHistory()}</HistoryWrapper>
        </History>
        <RightPane>Right Pane</RightPane>
      </Wrapper>
    );
  }
}

export default view(RoomView);
