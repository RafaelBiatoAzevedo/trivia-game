import React from 'react';
import '../styles/ranking.css';

import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import {
  FaArrowLeft,
  FaLongArrowAltUp,
  FaLongArrowAltDown,
} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { BsTrophyFill } from 'react-icons/bs';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.invertRanking = this.invertRanking.bind(this);
    this.setRankingState = this.setRankingState.bind(this);
    this.resetRanking = this.resetRanking.bind(this);
    this.state = {
      ranking: [],
      orderRanking: true,
      openModal: false,
    };
  }

  componentDidMount() {
    this.setRankingState();
  }

  goFor = (pageName) => {
    this.props.history.push(`/${pageName}`);
  };

  toggleOrderRanking() {
    this.setState((prev) => ({
      orderRanking: !prev.orderRanking,
    }));
  }

  setRankingState() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking) this.setState({ ranking });
  }

  resetRanking() {
    localStorage.setItem('ranking', JSON.stringify([]));
    this.setRankingState();
    this.setState({ openModal: false });
  }

  invertRanking() {
    const { ranking, orderRanking } = this.state;
    this.toggleOrderRanking();
    if (orderRanking) {
      ranking.sort((a, b) => a.score - b.score);
    } else {
      ranking.sort((a, b) => b.score - a.score);
    }
    this.setState({ ranking });
  }

  renderBtns() {
    const { orderRanking } = this.state;

    return (
      <div className="container-btns">
        <Button
          icon={<FaArrowLeft size="1.6rem" />}
          title="Home"
          textSize="1.4rem"
          textColor="white"
          textWeight="600"
          onClick={() => this.goFor('')}
        />
        <div className="container-btns-right">
          <Button
            icon={<MdDelete size="1.6rem" />}
            title="Clear"
            textSize="1.4rem"
            textColor="white"
            textWeight="600"
            onClick={() => this.setState({ openModal: true })}
          />
          <Button
            icon={
              orderRanking ? (
                <FaLongArrowAltUp size="1.6rem" />
              ) : (
                <FaLongArrowAltDown size="1.6rem" />
              )
            }
            title="Invert "
            textSize="1.4rem"
            textColor="white"
            textWeight="600"
            onClick={this.invertRanking}
          />
        </div>
      </div>
    );
  }

  render() {
    const { ranking, orderRanking, openModal } = this.state;

    return (
      <div className="container-main-play">
        {openModal && (
          <Modal
            handleclickCancel={() => this.setState({ openModal: false })}
            handleClickConfirm={this.resetRanking}
            text="Do you really want to delete all ?"
          />
        )}
        <h1 style={{ color: 'white', fontSize: '3rem', padding: '2rem 0' }}>
          Ranking
        </h1>
        {this.renderBtns()}
        <div className="container-grid-ranking">
          {ranking.map((player, index) => (
            <>
              <div>
                {orderRanking ? (
                  index <= 2 ? (
                    <BsTrophyFill
                      color={
                        index === 0
                          ? '#ffd700'
                          : index === 1
                          ? '#c0c0c0'
                          : '#cd7f32'
                      }
                      size="3rem"
                    />
                  ) : null
                ) : index >= ranking.length - 3 ? (
                  <BsTrophyFill
                    color={
                      index === ranking.length - 1
                        ? '#ffd700'
                        : index === ranking.length - 2
                        ? '#c0c0c0'
                        : '#cd7f32'
                    }
                    size="3rem"
                  />
                ) : null}
              </div>
              <div>
                <span>{`${
                  orderRanking ? index + 1 : ranking.length - index
                }#`}</span>
              </div>
              <div>
                <img src={player.gravatarEmail} alt="player" />
              </div>
              <div className="content-grid-column">
                <p>{player.name}</p>
                <p>{`Score: ${player.score} pts`}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default Ranking;
