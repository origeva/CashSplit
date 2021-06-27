import React, {useEffect, useRef, useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Header from './Header';
import Waiter from './Waiter';
import NumericInput from 'react-native-numeric-input';
import MyNumericInput from './NumericInput';

const Main = ({navigation}) => {
  const [totalTips, setTotalTips] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [restaurant, setRestaurant] = useState(0);
  const [waiters, setWaiters] = useState([
    // {id: 0, name: 'Ori', split: 0, workingHours: 3},
    // {id: 1, name: 'Dan', split: 0, workingHours: 2.75},
  ]);
  const [waiterName, setWaiterName] = useState('');
  const [waiterHours, setWaiterHours] = useState(0);
  const [waiterSplit, setWaiterSplit] = useState(0);
  const [managerSplit, setManagerSplit] = useState(0);
  const [bartenderSplit, setBartenderSplit] = useState(0);
  const [perHour, setPerHour] = useState(0);

  const [calculateManager, setCalculateManager] = useState(true);
  const [calculateBartender, setCalculateBartender] = useState(true);

  const removeWaiter = id => {
    setWaiters(currentWaiters => {
      return currentWaiters.filter(waiter => waiter.id != id);
    });
  };

  const roundDown = number => {
    return Math.floor(number * 10) / 10;
  };

  useEffect(() => {
    if (totalTips === 0) {
      setRestaurant(0);
      setManagerSplit(0);
      setBartenderSplit(0);
      setWaiters(currentWaiters => {
        let newWaiters = currentWaiters;
        currentWaiters.forEach((waiter, index) => {
          newWaiters[index].split = 0;
        });
        return newWaiters;
      });
    } else {
      let remaining = totalTips;
      let th = 0; // Total Hours
      waiters.forEach(waiter => (th += waiter.workingHours));
      setTotalHours(th);
      let res = th * 3; // Restaurant
      if (Math.round((res % 0.1) * 100) / 100 === 0.05) {
        res += 0.25;
      }
      setRestaurant(res);
      remaining -= res;
      if (calculateManager) {
        let manager = roundDown(remaining * 0.1);
        setManagerSplit(manager);
        remaining -= manager;
      } else {
        setManagerSplit(0);
      }
      if (calculateBartender) {
        let bartender = roundDown(remaining * 0.1);
        setBartenderSplit(bartender);
        remaining -= bartender;
      } else {
        setBartenderSplit(0);
      }

      let perHour = roundDown(remaining / th);
      setPerHour(perHour);
      setWaiters(currentWaiters => {
        let newWaiters = currentWaiters;
        currentWaiters.forEach((waiter, index) => {
          newWaiters[index].split = roundDown(waiter.workingHours * perHour);
        });
        return newWaiters;
      });
    }
  }, [totalTips, waiters, calculateManager, calculateBartender]);

  return (
    <View style={styles.container}>
      <View style={{flex: 5}}>
        {/* <Header title="CashSplit" /> */}
        <View style={{flexDirection: 'row'}}>
          <Text style={{...styles.text, flex: 0}}>
            {moment().format('DD/M/YY')}
          </Text>
          <MyNumericInput
            style={{flex: 1}}
            placeholder="Total"
            value={totalTips}
            onChange={setTotalTips}
          />
          <MaterialIcon
            style={{alignSelf: 'center', textAlign: 'center'}}
            size={30}
            name="settings"
            onPress={() => {
              navigation.navigate('Settings');
            }}
          />
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>Working Hours</Text>
            <Text style={styles.text}>Split</Text>
            <Text style={{...styles.text, flex: 1}} />
          </View>
          <FlatList
            data={waiters}
            renderItem={({item: waiter}) => (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    `${waiter.name}`,
                    `${perHour} * ${waiter.workingHours} = ${waiter.split}`,
                  );
                }}>
                <Waiter waiter={waiter} remove={removeWaiter} styles={styles} />
              </TouchableOpacity>
            )}
            keyExtractor={waiter => waiter.id}
          />
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.text}
              placeholder="Name"
              value={waiterName}
              onChangeText={value => setWaiterName(value)}
              // onSubmitEditing={totalInputElement.current.focus}
            />
            {/* <NumericInput
              value={waiterHours}
              onChange={setWaiterHours}
              steps={0.25}
              placeholder="Hours"
            /> */}
            <NumericInput
              rounded
              valueType="real"
              style={styles.text}
              // inputStyle={styles.text}
              minValue={0}
              step={0.25}
              value={waiterHours}
              onChange={setWaiterHours}
            />
            <Text style={styles.text}>{waiterSplit}</Text>
            <MaterialIcon
              style={{...styles.text, flex: 1}}
              name="check"
              color="green"
              onPress={() => {
                if (waiterName && waiterHours) {
                  setWaiters(currentWaiters => [
                    ...currentWaiters,
                    {
                      id: currentWaiters.length
                        ? currentWaiters[currentWaiters.length - 1].id + 1
                        : 0,
                      name: waiterName,
                      workingHours: waiterHours,
                      split: waiterSplit,
                    },
                  ]);
                  setWaiterName('');
                  setWaiterSplit(0);
                  // setWaiterHours(0);
                } else {
                  Alert.alert('Cannot submit without a name or working hours.');
                }
              }}
            />
          </View>
        </View>
      </View>
      <View style={{backgroundColor: 'lightgrey', flex: 1}}>
        <Text style={styles.text}>
          Total hours: {totalHours} Restaurant: {restaurant}
        </Text>
        <Text style={styles.text}>Manager: {managerSplit}</Text>
        <Text style={styles.text}>Bartender: {bartenderSplit}</Text>
      </View>
      <View style={{backgroundColor: 'lightgrey', flex: 1}}>
        <Text style={styles.text}>
          Calculate Manager
          <Switch
            value={calculateManager}
            onValueChange={() => setCalculateManager(!calculateManager)}
          />
        </Text>
        <Text style={styles.text}>
          Calculate Bartender
          <Switch
            value={calculateBartender}
            onValueChange={() => setCalculateBartender(!calculateBartender)}
          />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  text: {
    flex: 3,
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    padding: 7,
  },
  img: {
    width: 100,
    height: 100,
  },
});

export default Main;
