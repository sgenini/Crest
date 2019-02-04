import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Footer from "../Footer/Footer"

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div>
        <header>
          <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
            <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
              <h1>Welcome to Crest</h1>
              <h5><small><em>Market Trading. Simplified.</em></small></h5>
              <br />
              <p>Develop your own portfolio from our pre-allocated budget and track its performance over time.</p>
              <br />
              <p>Practice and hone your trading strategies using real-time stock market data, <br /> all delivered through IEX Trading's reliable and accurate API.</p>
              <br />
              <Link to="/signup"><MDBBtn color="elegant">Sign Up</MDBBtn></Link>
              <Link className="text-white" to="/login">or <strong>Log In</strong></Link>
            </MDBMask>
          </MDBView>
        </header>

        <main>
          <MDBCol md="7" className="mx-auto">
            <MDBContainer className="text-center my-5">
              <p align="justify-center">Crest is a mock stock trading platform that enables users to purchase and trade imaginary shares of real stocks in real time. Its purpose is to allow the user to practice stock trading strategies without putting up real money. Upon creating an account, the user will be given a budget of $20,000, and will be asked to build a portfolio by searching and purchasing stocks at their real-time market prices. Afterwards, the user will be able to sell and buy stocks at their discretion, based on their trading strategies and fluctuating market values. Crest will chart their portfolio performance over time and let the user see how their trades would have done in a real market. Crest will also allow users to access price history data for stocks, enabling users to experiment with alternate trading time lines, (i.e. what would my return be if I had bought x amount of this stock two years ago).</p>
            </MDBContainer>
            <MDBContainer className="text-center my-5">
              <p align="justify-center">We think this app will be useful for people, especially young people, who are interested in investing but don’t have trading experience. Instead of making rookie mistakes with real money, using this app people can learn to trade in a fun consequence-free way. Also users will be free to try multiple different trading strategies simultaneously, allowing them to see what strategy performed the best over time. We hope that this app will help break down the boundary between regular people and financial literacy by taking away the need for expendable income to begin educating themselves. Also, more experienced traders will be able to use the app to demonstrate and share their knowledge in a sandbox-style non-competitive environment.</p>
            </MDBContainer>
            <MDBContainer className="text-center my-5">
              <p align="justify-center">Another feature we would like to add if we have time is a fantasy-football style game mode that allows friendly competition between users. Users will agree to participate in a competition to see who can earn the most “money” trading stocks in a predetermined period of time. A group of users will all start the game with the same amount of “money” in their portfolio, and the winner will be the one who has the best return on investment after the time period has ended. We think this feature would motivate users to trade more by creating a good-spirited competitive/social element to the app.</p>
            </MDBContainer>
          </MDBCol>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Landing;