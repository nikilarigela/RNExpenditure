import React from "react";
import { Card, Title } from "react-native-paper";

const CardLegend = props => {
  return (
    <Card style={{ marginVertical: 8, width: "40%" }} onPress={props.onPress}>
      <Card.Title title={props.title || "N/A"} />
      <Card.Content>
        <Title>{props.subTitle || "N/A"}</Title>
      </Card.Content>
    </Card>
  );
};

export default CardLegend;
