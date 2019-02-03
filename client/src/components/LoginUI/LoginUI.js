import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class LoginUI extends React.Component {
  render() {
    return (
      <div>
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white">
              <h1>Welcome back to Crest.</h1> 
            </MDBRow>
            
            <MDBContainer className="flex-center flex-column mx-auto" style={{ marginTop: -50, height: 2500 }}>
              <MDBCol md="12">

                <MDBRow>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol lg="5" className="mx-auto white-text">
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)' }}>
                          <MDBCardBody>
                            <form>
                              <p className="h2 py-4"><small>Account Login</small></p>
                              <div className="white-text text-left mx-auto px-2">
                                <MDBInput
                                  label="Your email"
                                  icon="envelope"
                                  group
                                  type="email"
                                  validate
                                  error="wrong"
                                  success="right"
                                  className="white-text"
                                />
                                <MDBInput
                                  label="Your password"
                                  icon="lock"
                                  group
                                  type="password"
                                  validate
                                  className="white-text"
                                />
                              </div>
                              <div className="text-center mt-3">
                                <MDBBtn color="grey" type="submit">
                                  Login
                                </MDBBtn>
                              </div>
                              <hr style={{ width: 250, backgroundColor: 'grey' }}/>
                              <p className="grey-text"><small>Don't have an account? </small></p>
                              <Link to="/signup" className="text-white"><MDBBtn outline color="grey" size="md">Sign Up</MDBBtn></Link>
                            </form>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </MDBRow>
              </MDBCol>  
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default LoginUI;