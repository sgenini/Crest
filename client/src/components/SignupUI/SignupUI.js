import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class SignupUI extends React.Component {
  render() {
    return (
      <div>
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white">
              <h1>Welcome to Crest.</h1> 
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
                              <p className="h2 py-4"><small>Create an Account</small></p>
                              <div className="white-text text-left mx-auto px-2">
                                <MDBInput
                                  label="Full Name"
                                  icon="user"
                                  group
                                  type="text"
                                  validate
                                  error="wrong"
                                  success="right"
                                  className="white-text"
                                />
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
                                  label="Confirm your email"
                                  icon="exclamation-triangle"
                                  group
                                  type="text"
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
                                  Register
                                </MDBBtn>
                              </div>
                              <hr style={{ width: 250, backgroundColor: 'grey' }}/>
                              <p className="grey-text"><small>Already a user? </small></p>
                              <Link to="/login" className="text-white"><MDBBtn outline color="grey" size="md">Log In</MDBBtn></Link>
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

export default SignupUI;