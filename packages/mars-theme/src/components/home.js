import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import List from "./list";
import Header from "./header";
import FeaturedMedia from "./featured-media";
import striptags from "striptags";

const Home = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  const author = state.source.author[post.author];
  // Get a human readable date.
  const date = new Date(post.date);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, []);
  // Load the post, but only if the data is ready.    

  return data.isReady ? (
    <Container>
      {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
          {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>
      <Content>
        <VideoContainer>
          <Video autoPlay muted loop src={post.acf.video["url"]} />
          <TextContainer>
            <BodyContainer dangerouslySetInnerHTML={{ __html: post.acf.body }}></BodyContainer>
            <StyledLink link="/what-we-do/">Learn More</StyledLink>
          </TextContainer>
        </VideoContainer>
      </Content>
    </Container>
  ) : null;
};

export default connect(Home);

const Container = styled.div`
  margin: 0;
  width: 100%;
  overflow:hidden;
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: absolute;
  z-index: 2;
  margin: auto;
  width: 100%;  
`;
const VideoContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
`;

const TextContainer = styled.div`
  position:relative;  
  z-index:1;
  max-width:1440px;
  margin:auto;
  width:100%;
`;

const BodyContainer = styled.h1`
  padding-left:114px;
`;

const Video = styled.video`
  object-fit: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const StyledLink = styled(Link)`    
  text-transform:uppercase;
  text-decoration:none;
  padding-left:114px;
`;

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }  

  .p {
    /* line-height: 1.6em; */
    margin:0;
    font-size:20px;
    font-weight: 300;
    font-style: normal;
    letter-spacing:0;
    line-height:28px;
    color:#1d1d1d;
  }
  p{
    margin:0;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
