import styled from "@emotion/styled";
import {useEnvironment, useKeyboardLayout} from "spacesvr";
import {isMobile} from "react-device-detect";

const Container = styled.div<{ paused: boolean; dev?: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  transition: opacity 0.25s ease;
  background: rgba(0, 0, 0, ${(props) => (props.dev ? 0 : 0.25)});
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.paused ? 1 : 0)};
  pointer-events: ${(props) => (props.paused ? "all" : "none")};
  @font-face {
    font-family: EtherRealms;
    src: url("https://d1p3v0j4bqcb21.cloudfront.net/fonts/Etherrealms.otf") format("opentype");
  }
  //font-family: "Quicksand", sans-serif;
`;

const ClickContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Window = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 20px 20px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  //background-image: url("https://d1p3v0j4bqcb21.cloudfront.net/images/AdobeStock_158507455.jpeg");
  background-color: white;
  //border: 2px solid black;
  background-position: center;
  background-size: cover;
  box-sizing: border-box;

  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
`;

const Logo = styled.img`
  height: 3.5em;
  vertical-align: middle;
  //margin-right: 15px;
  margin: -15% 0 -15% 0;
  //border: 2px dashed red;
`;

const Title = styled.h1`
  margin: 0;
`;

const Instructions = styled.div`
  width: 100%;
  height: auto;
  margin: 30px 0;
  font-size: 0.7em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > p {
    margin: 0.2em;
  }
`;

const Continue = styled.div<{ color: string }>`
  width: 90%;
  max-width: 400px;
  height: auto;
  cursor: pointer;
  text-align: center;
  font-size: 1.3em;
  font-family: "Quicksand", sans-serif;
  transition: opacity 0.15s linear;
  margin-top: 20px;
  background: ${(props) => props.color};
  color: white;
  //border: 2px solid black;
  line-height: 1em;
  padding: 12px 0;
  border-radius: 10px;
  :hover {
    opacity: 0.5;
  }

  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
`;

export default function PauseMenu() {

  // const dev = process.env.NODE_ENV === "development";
  const dev = false;
  const { paused, overlay, setPaused, menuItems } = useEnvironment();
  const layout = useKeyboardLayout();
  const closeOverlay = () => setPaused(false);

  if (dev) {
    return (
      <Container paused={paused} dev={true}>
        <ClickContainer onClick={closeOverlay} />
      </Container>
    );
  }

  return (
    <Container paused={paused} dev={dev}>
      <ClickContainer onClick={closeOverlay} />
      <Window>
        <Title>
          <Logo src="https://d1p3v0j4bqcb21.cloudfront.net/images/4pxArtboard+4.png" />
        </Title>
        <Instructions>
          <p>Move – {isMobile ? "Joystick" : layout}</p>
          <p>Look – {isMobile ? "Drag" : "Mouse"}</p>
          <p>Pause – {isMobile ? "Menu Button" : "Esc"}</p>
        </Instructions>
      </Window>
      <Continue onClick={closeOverlay} color="black">
        continue
      </Continue>
    </Container>
  )
}