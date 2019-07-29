import React from "react";
import { View } from "react-native";

const Container = props => {
  const styles = { flex: 1, backgroundColor: "#212121", ...props.style };
  return <View style={styles}>{props.children}</View>;
};

export default Container;
