import React, { Component } from "react";
import { connect, styled } from "frontity";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  componentWillUnmount = () => {
    this.stopVideo();
  };
  playVideo = () => {
    this.refs.vidRef.play();
    this.setState({ active: true });
    document.querySelector('#cursor').classList.add('is-playing'); 
    if (document.querySelector("#checkIfOpen")) {
      document.querySelector("#checkIfOpen").classList.add("is-open");
    }
  };

  stopVideo = () => {
    this.refs.vidRef.pause();
    this.refs.vidRef.currentTime = 0;
    this.setState({ active: false });
    document.querySelector('#cursor').classList.remove('is-playing'); 
    if (document.querySelector("#checkIfOpen")) {
      document.querySelector("#checkIfOpen").classList.remove("is-open");
    }
  };
  pauseVideo = () => {
    if (this.refs.vidRef.paused) {
      this.refs.vidRef.play();
    } else {
      this.refs.vidRef.pause();
    }
  };
  onKeyPressed = e => {
    if (e.key === "Escape") {
      this.refs.vidRef.pause();
      this.refs.vidRef.currentTime = 0;
      this.setState({ active: false });
      if (document.querySelector("#checkIfOpen")) {
        document.querySelector("#checkIfOpen").classList.remove("is-open");
      }
    }
  };

  render = () => {
    return (
      <Container className={[this.state.active, this.props.nav].join(" ")}>
        <ButtonContainer
          data-stick-cursor
          className={this.state.active ? "active link" : ""}
        >
          <CloseButton onClick={this.stopVideo}>Close</CloseButton>
        </ButtonContainer>
        <Video
          onKeyDown={this.onKeyPressed}
          tabIndex="0"
          preload="none"
          ref="vidRef"
          src={this.props.src}
          type="video/mp4"
          onClick={this.pauseVideo}
          onEnded={() => this.stopVideo()}
          className={this.state.active ? "active" : ""}
          className={`${this.state.active ? "active" : ""} videoOpen`}
        />
        <div className="link" data-stick-cursor>
          <PlayButton
            className={[this.state.active, this.props.nav].join(" ")}
            onClick={this.playVideo}
          >
            <svg
              id="Collapse_Expand_1"
              data-name="Collapse/Expand 1"
              xmlns="http://www.w3.org/2000/svg"
              width="58.739"
              height="58.739"
              viewBox="0 0 58.739 58.739"
            >
              <g
                id="Collapse_Expand_1-2"
                data-name="Collapse/Expand 1"
                transform="translate(55.36 -716.142) rotate(60)"
              >
                <g
                  id="Ellipse_1"
                  data-name="Ellipse 1"
                  transform="translate(611.136 373.764)"
                  fill="none"
                  stroke="#ffc40a"
                  strokeWidth="11"
                >
                  <circle cx="21.5" cy="21.5" r="21.5" stroke="none" />
                  <circle cx="21.5" cy="21.5" r="16" fill="none" />
                </g>
                <circle
                  id="Ellipse_8"
                  data-name="Ellipse 8"
                  cx="3"
                  cy="3"
                  r="3"
                  transform="translate(629.265 392.363)"
                />
              </g>
            </svg>
            <span>Play Our Reel</span>
          </PlayButton>
        </div>
      </Container>
    );
  };
}
export default VideoPlayer;

const Container = styled.div`
  /* z-index: 4; */
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: none;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, 0%);
  &.true {
    z-index: 90;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    transform: none;
    position: fixed;
  }
  &.nav {
    position: fixed;
    z-index: 900;
    top: 50%;
    transform: translate(-50%, 0%);
    &.true {
      top: 0;
      transform: translate(0%, 0%);
    }
    @media (max-width: 768px) {
      transform: translate(-50%, 0%);
    }
  }
  @media (max-width: 768px) {
    top: 75%;
  }
`;
const Video = styled.video`
  object-fit: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: none;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E %3Ccircle id='Cursor' cx='6' cy='6' r='6' fill='%23ffc40a' opacity='0.9'/%3E %3C/svg%3E "),
    pointer;
  &.active {
    display: flex;
    z-index: 10;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='42' viewBox='0 0 42 42'%3E %3Cg id='Group_687' data-name='Group 687' transform='translate(-889 -514)'%3E %3Ccircle id='Ellipse_11' data-name='Ellipse 11' cx='21' cy='21' r='21' transform='translate(889 514)' fill='%23ffc40a'/%3E %3Cg id='icon_-_pause' data-name='icon - pause' transform='translate(-29.5 -0.5)'%3E %3Cline id='Line_112' data-name='Line 112' y2='8' transform='translate(937.5 531.5)' fill='none' stroke='%23fff' stroke-width='2'/%3E %3Cline id='Line_113' data-name='Line 113' y2='8' transform='translate(941.5 531.5)' fill='none' stroke='%23fff' stroke-width='2'/%3E %3C/g%3E %3C/g%3E %3C/svg%3E "),
      pointer !important;
  }
`;
const ButtonContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  /* height: 47.688; */
  margin: auto;
  margin-top: 0;
  display: none;
  /* z-index: 900; */
  position: relative;
  padding: 24px 0;
  align-items: center;
  &.active {
    display: flex;
     max-width: 1440px;
  }
  @media (max-width: 768px) {
    width: auto;
  }
`;
const PlayButton = styled.button`
  width: fit-content;
  font-weight: 500;
  line-height: 51px;
  letter-spacing: 0.84px;
  font-size: 14px;
  text-transform: uppercase;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  cursor: none;
  z-index: 6;
  /* transition: color 250ms ease-in-out; */
  width: 200px;
  height: 200px;
  outline: none;
  position: relative;
  border-radius: 100%;
  &:before{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -85%);
    content:'';
    animation-name: dots-spin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    height:30px;
    width:30px;
    border-radius:100%;
  }
   @media (max-width: 768px) {
     &:before{
       transform:translate(-50%, -50%);
     }
   }
  span {
    position: absolute;
    opacity: 0;
    width: 200px;
    height: 200px;
    border-radius: 100%;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.84px;
    left: 0;
    top: 37.5%;
    color: #1d1d1d;
    /* transition: opacity 500ms ease-in-out; */
  }
  svg {
    
    border-radius: 50%;
    
    #Ellipse_8 {
      fill: #fff;
    }
  }
  @keyframes dots-spin {
    from {
      box-shadow: 0 0 0 10px rgba(255, 196, 0, 0.301);
    }

    to {
      box-shadow: 0 0 0 30px rgba(255, 196, 0, 0);
    }
  }
  @-webkit-keyframes dots-spin {
    from {
      box-shadow: 0 0 0 10px rgba(255, 196, 0, 0.301);
    }

    to {
      box-shadow: 0 0 0 30px rgba(255, 196, 0, 0);
    }
  }
  &:hover,
  &:focus,
  &:active {
    svg {
      opacity: 0;
      display: none;
      #Ellipse_8 {
        fill: transparent;
      }
    }
    span {
      opacity: 1;
    }
    @media (max-width: 768px) {
      span {
        /* color: #ffc400 !important; */
        background-color: #ffc400;
        width: 130px;
        height: 130px;
        max-width: none;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        left: -50%;
        top: -50%;
        transform:translate(-50%, 0);
      }
    }
  }
  &.true {
    svg {
      display: none;
    }
    span {
      display: none;
    }
  }
  &.nav {
    svg {
      /* animation: none; */
    }
    &:hover{
      svg{
        display:none;
      }
    }
    @media (max-width: 768px) {
      /* top: -25px; */
    }
  }
  @media (max-width: 768px) {
    height: auto;
    width: auto;
    height: 58.73px;
    padding: 0;
    span {
      height: auto;
      width: auto;
      display: none;
    }
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 105px;
  right: 55px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  /* width: fit-content; */
  font-weight: 500;
  line-height: 51px;
  letter-spacing: 0.84px;
  font-size: 12px;
  text-transform: uppercase;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-appearance: none;
  transition: color 250ms ease-in-out;
  z-index: 900;
  color: #ffc40a;
  max-width: none;
  &:hover {
  }
  @media (max-width: 768px) {
    top: 33px;
    right: 8px;
    display: flex;
    width: 100px;
    z-index: 999;
    height: auto;
    position: fixed;
  }
`;
