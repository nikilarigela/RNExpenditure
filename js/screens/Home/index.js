import React from "react";
import { View } from "react-native";
import { Button, ActivityIndicator, Card, Title } from "react-native-paper";
import { connect } from "react-redux";
import Container from "../../components/Container";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import AddExpenditure from "./AddExpenditureModal";
import { ADD_EXPENSE, ADD_USER, REMOVE_EXPENSE } from "../../constants/actions";
import { getAuthToken } from "../../utils/asyncStorage";
import uuidv1 from "uuid/v1";
import { FlatList } from "react-native-gesture-handler";
import { firstDay, lastDay } from "../../utils/dates";

class Home extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    visible: false,
    date: "",
    expenseLabel: "",
    expenseAmount: "",
    user: "",
    isFetching: true
  };

  componentDidMount() {
    this.addUser();
  }

  addUser = async () => {
    const user = await getAuthToken();
    this.props.dispatch({ type: ADD_USER, payload: { user } });
    this.setState({ user, isFetching: false });
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ date: moment(date).format("DD-MM-YYYY") });
    this.hideDateTimePicker();
    this.showModal();
  };

  showModal = () => this.setState({ visible: true });

  hideModal = () => this.setState({ visible: false });

  onChangeExpenseLabel = expenseLabel => this.setState({ expenseLabel });

  onChangeExpenseAmount = expenseAmount => this.setState({ expenseAmount });

  addExpense = () => {
    const { expenseLabel, expenseAmount, user, date } = this.state;
    this.props.dispatch({
      type: ADD_EXPENSE,
      payload: {
        user,
        label: expenseLabel,
        amount: expenseAmount,
        id: uuidv1(),
        date
      }
    });
    this.setState({
      isDateTimePickerVisible: false,
      visible: false,
      date: "",
      expenseLabel: "",
      expenseAmount: ""
    });
  };

  renderItem = ({ item }) => (
    <Card
      onPress={() => this.removeExpense(item.id)}
      style={{ marginHorizontal: 16, marginVertical: 8 }}
    >
      <Card.Title title={item.label} />
      <Card.Content>
        <Title>
          {item.amount}
          {"RS."}
        </Title>
      </Card.Content>
    </Card>
  );

  removeExpense = id => {
    const { user } = this.state;
    this.props.dispatch({ type: REMOVE_EXPENSE, payload: { user, id } });
  };

  keyExtractor = item => `${item.id}`;

  render() {
    const { expenditure } = this.props;
    console.log(expenditure, firstDay, lastDay);
    let todaysExpense = "N/A";
    let monthlyExpense = "N/A";
    let todaysList = [];
    if (this.state.user) {
      todaysList = expenditure[this.state.user].data.filter(
        item => item.date === moment().format("DD-MM-YYYY")
      );

      todaysExpense = todaysList
        .map(item => parseInt(item.amount))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      monthlyExpense = expenditure[this.state.user].data
        .filter(item => moment(item.date).isBetween(firstDay, lastDay))
        .map(item => parseInt(item.amount))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    return (
      <Container>
        <View style={{ flex: 1 }}>
          {this.state.isFetching ? (
            <ActivityIndicator />
          ) : (
            <>
              <Title style={{ color: "white", fontSize: 32, padding: 16 }}>
                Hello {this.state.user},
              </Title>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly"
                }}
              >
                <Card style={{ marginVertical: 8, width: "40%" }}>
                  <Card.Title title="Today's" />
                  <Card.Content>
                    <Title>
                      {todaysExpense}
                      {"Rs."}
                    </Title>
                  </Card.Content>
                </Card>
                <Card style={{ marginVertical: 8, width: "40%" }}>
                  <Card.Title title="This Month" />
                  <Card.Content>
                    <Title>
                      {monthlyExpense} {"Rs."}
                    </Title>
                  </Card.Content>
                </Card>
              </View>
              <Title style={{ color: "white", fontSize: 16, padding: 16 }}>
                Today's List
              </Title>
              <FlatList
                data={todaysList}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
              />
            </>
          )}
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <AddExpenditure
          visible={this.state.visible}
          hideModal={this.hideModal}
          date={this.state.date}
          expenseLabel={this.state.expenseLabel}
          expenseAmount={this.state.expenseAmount}
          onChangeExpenseAmount={this.onChangeExpenseAmount}
          onChangeExpenseLabel={this.onChangeExpenseLabel}
          addExpense={this.addExpense}
        />
        <Button
          icon="add"
          style={{ marginVertical: 8 }}
          mode="contained"
          onPress={this.showDateTimePicker}
          theme={{ colors: { primary: "#fff" } }}
        >
          Add Expense
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = ({ expenditure }) => ({ expenditure });

export default connect(mapStateToProps)(Home);
