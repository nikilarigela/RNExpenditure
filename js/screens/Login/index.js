import React from "react";
import Container from "../../components/Container";
import { TextInput, Button, Title } from "react-native-paper";
import { setAuthToken } from "../../utils/asyncStorage";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  authenticate = () => {
    const { email, password } = this.state;
    if (email && password) {
      setAuthToken(email + password);
      this.props.navigation.navigate("Home");
    } else {
      alert("Login failed");
    }
  };

  render() {
    return (
      <Container style={{ justifyContent: "center" }}>
        <Title
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 32,
            marginBottom: 32
          }}
        >
          Expenses
        </Title>
        <TextInput
          style={{ marginVertical: 6 }}
          label="Email"
          mode="flat"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={{ marginVertical: 6 }}
          label="Password"
          mode="flat"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          theme={{ colors: { primary: "#fff" } }}
        />
        <Button
          style={{ marginVertical: 8 }}
          mode="contained"
          onPress={this.authenticate}
          theme={{ colors: { primary: "#fff" } }}
        >
          Login
        </Button>
      </Container>
    );
  }
}

export default Login;
