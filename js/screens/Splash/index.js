import React from "react";
import { View, Text } from "react-native";
import { Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAuthToken } from "../../utils/asyncStorage";

class Splash extends React.Component {
  componentDidMount() {
    this.navigateTo();
  }

  navigateTo = async () => {
    const token = await getAuthToken();
    let screen = "Login";
    if (token) {
      screen = "Home";
    }
    setTimeout(() => {
      this.props.navigation.navigate(screen);
    }, 2000);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#212121",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          name="attach-money"
          color={Colors.white}
          size={64}
          onPress={() => console.log("Pressed")}
        />
        <Text style={{ color: Colors.white, fontSize: 48, fontWeight: "bold" }}>
          Expenses
        </Text>
      </View>
    );
  }
}

export default Splash;
