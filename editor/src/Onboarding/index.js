import React from 'react'
import styled from 'styled-components'
import Transition from 'react-motion-ui-pack'
import Button from '../Button'

const Container = styled.div`
  padding: 10px;
  position: absolute;
  background-color: whitesmoke;
  left: 5vw;
  top: 5vh;
  overflow-y: auto;
  height: 90vh;
  width: 90vw;
  div {
    padding-bottom: 10px;
  }
`

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 640px;
`

const Title = styled.h1`
  margin-top: 0;
  padding-top: 18px;
  font-size: 56px;
  font-weight: 300;
`

const Sub = styled.h1`
  font-size: 16px;
  font-weight: normal;
  margin-top: 0;
`

const FAQ = styled.div`
  h1 {
    font-weight: 300;
  }

  li, div {
    padding-bottom: 10px;
  }

  div {
    padding-left: 10px;
  }
`

export default ({ onStart, show }) => (
  <Transition
    component={false}
    enter={{ opacity: 1, scale: 1 }}
    leave={{ opacity: 0, scale: 1.3 }}
  >
    { show &&
      <Container key='container'>
        <InnerContainer>
          <Title centered>Riyu Editor</Title>
          <Sub centered><b>
            <a href='https://github.com/Secretmapper/Riyu'>Riyu</a>
          </b> is a cool, modern, and minimal portfolio/personal web page template that is super easy to customize.</Sub>
          <Sub><b>Riyu Editor</b> is a companion web app that allows you to <i>easily</i> add your own content for Riyu. The editor creates both a ready built html file you can drop on your server and a data.json file for use on Riyu's build system.</Sub>
          <FAQ>
            <h1>FAQ:</h1>
            <ul>
              <li>How do I add my own images for my projects?</li>
              <div>Simply add in the expected filename of your image (project.png) and generate the HTML. Then place your images on a directory named img - this is where all the images are resolved (/img/project.png). You can of course edit the html once generated.</div>
              <li>Can I change the colour scheme?</li>
              <div>You can change the colour scheme (and every style really) of Riyu. Changing colour schemes/styles through the Riyu Editor web app is currently not supported.</div>
              <li>Is it free?</li>
              <div>Riyu is free (as in beer) and open source (MIT). There is no need to add credits or linkbacks, but I'd appreciate if you star the <a href='https://github.com/Secretmapper/Riyu'>repo</a> :)</div>
            </ul>
          </FAQ>

          <div>I'd love to hear what everyone is doing with Riyu. If so inclined, Open an <a href='https://github.com/Secretmapper/Riyu/issues'>issue here</a> with a link to a site built on Riyu</div>
          <div>You can open this page again by clicking the i button on the left inside the editor</div>
          <Button onClick={onStart}>Start Editing</Button>
        </InnerContainer>
      </Container>
    }
  </Transition>
)
