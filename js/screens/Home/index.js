import React from "react";
import { View } from "react-native";
import {
  Button,
  ActivityIndicator,
  Card,
  Title,
  Switch,
  Colors,
  Text,
  TouchableRipple
} from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import Container from "../../components/Container";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import AddExpenditure from "./AddExpenditureModal";
import {
  ADD_EXPENSE,
  ADD_USER,
  REMOVE_EXPENSE,
  REMOVE_USER
} from "../../constants/actions";
import { getAuthToken } from "../../utils/asyncStorage";
import uuidv1 from "uuid/v1";
import { FlatList } from "react-native-gesture-handler";
import { firstDay, lastDay } from "../../utils/dates";
import CardLegend from "../../components/CardLegend";

class Home extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    visible: false,
    date: "",
    expenseLabel: "",
    expenseAmount: "",
    user: "",
    isFetching: true,
    isSwitchOn: false,
    selectedDate: moment().format("MM-DD-YYYY"),
    monthPicker: false
  };

  componentDidMount() {
    this.addUser();
  }

  addUser = async () => {
    const { dispatch, expenditure } = this.props;
    const user = await getAuthToken();
    if (!expenditure[user]) {
      dispatch({ type: ADD_USER, payload: { user } });
    }

    this.setState({ user, isFetching: false });
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ date: moment(date).format("MM-DD-YYYY") });
    this.hideDateTimePicker();
    this.showModal();
  };

  showMonthPicker = () => {
    this.setState({ monthPicker: true });
  };

  hideMonthPicker = () => {
    this.setState({ monthPicker: false });
  };

  handleMonthPicker = date => {
    this.setState({ selectedDate: moment(date).format("MM-DD-YYYY") });
    this.hideMonthPicker();
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
      <Card.Title
        title={`${moment(item.date).format("DD/MM/YYYY")} - ${item.label}`}
      />
      <Card.Content>
        <Title>
          {"RS."}
          {item.amount}
        </Title>
      </Card.Content>
    </Card>
  );

  removeExpense = id => {
    const { user } = this.state;
    this.props.dispatch({ type: REMOVE_EXPENSE, payload: { user, id } });
  };

  keyExtractor = item => `${item.id}`;

  logOut = () => {
    console.log("hey");
    this.props.dispatch({
      type: REMOVE_USER,
      payload: { user: this.state.user }
    });
    this.props.navigation.navigate("Login");
  };

  render() {
    const { expenditure } = this.props;
    let todaysExpense = "N/A";
    let monthlyExpense = "N/A";
    let list = [];
    if (this.state.user) {
      list = expenditure[this.state.user].data.filter(item =>
        this.state.isSwitchOn
          ? moment(moment(item.date).format()).isBetween(
              firstDay(this.state.selectedDate),
              lastDay(this.state.selectedDate)
            )
          : item.date === moment(this.state.selectedDate).format("MM-DD-YYYY")
      );

      todaysExpense = expenditure[this.state.user].data
        .filter(
          item =>
            item.date === moment(this.state.selectedDate).format("MM-DD-YYYY")
        )
        .map(item => parseInt(item.amount))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      monthlyExpense = expenditure[this.state.user].data
        .filter(item =>
          moment(moment(item.date).format()).isBetween(
            firstDay(this.state.selectedDate),
            lastDay(this.state.selectedDate)
          )
        )
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Title
                  style={{
                    color: "white",
                    fontSize: 32,
                    paddingHorizontal: 16,
                    paddingTop: 16
                  }}
                >
                  Hello {this.state.user},
                </Title>
                <Icon
                  name="logout"
                  color={Colors.white}
                  size={26}
                  onPress={this.logOut}
                  style={{ padding: 4 }}
                />
              </View>
              <TouchableRipple onPress={this.showMonthPicker}>
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 16,
                    paddingTop: 4,
                    paddingBottom: 16
                  }}
                >
                  {moment(this.state.selectedDate).format("DD/MM/YYYY")}
                </Text>
              </TouchableRipple>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly"
                }}
              >
                <CardLegend
                  title={moment(this.state.selectedDate).format("DD/MM/YYYY")}
                  subTitle={`Rs.${todaysExpense}`}
                />
                <CardLegend
                  title="Month Total"
                  subTitle={`Rs.${monthlyExpense}`}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Title style={{ color: "white", fontSize: 16, padding: 16 }}>
                  {this.state.isSwitchOn ? `Month List` : `Day List`}
                </Title>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Title style={{ color: "white", fontSize: 16, padding: 16 }}>
                    Day
                  </Title>
                  <Switch
                    color={Colors.white}
                    theme={{ colors: { primary: "#fff" } }}
                    value={this.state.isSwitchOn}
                    onValueChange={() => {
                      this.setState(prevState => ({
                        isSwitchOn: !prevState.isSwitchOn
                      }));
                    }}
                  />
                  <Title style={{ color: "white", fontSize: 16, padding: 16 }}>
                    Month
                  </Title>
                </View>
              </View>

              <FlatList
                data={list}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
              />
            </>
          )}
        </View>
        <DateTimePicker
          key={"01"}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <DateTimePicker
          key="02"
          isVisible={this.state.monthPicker}
          onConfirm={this.handleMonthPicker}
          onCancel={this.hideMonthPicker}
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
