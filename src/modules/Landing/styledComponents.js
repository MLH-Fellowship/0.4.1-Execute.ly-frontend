import styled from "styled-components";
import ImageBackground from "../../assets/background.png";

export const StyledLandingPage = styled.div`
  padding-top: 1rem;
  min-height: 100vh;

  .content-heading {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 8vw;
    text-align: right;
    margin: 0 10rem 0 0;
  }

  .content-intro {
    font-family: "Open Sans", sans-serif;
    color: #a1664c;
    font-size: 1.5vw;
    text-align: left;
    float: right;
    margin: 0 22rem 0 0;
  }

  .landing-background {
    min-height: 100vh;
    background-image: url(${ImageBackground});
    margin: 0 auto;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 130% 60%;
  }
`;
