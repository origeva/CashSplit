import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Waiter = ({waiter, remove, styles}) => {
  const {id, name, split, workingHours} = waiter;
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{workingHours}</Text>
      <Text style={styles.text}>{split}</Text>
      <Icon
        style={{...styles.text, flex: 1}}
        name="minus"
        color="firebrick"
        onPress={() => remove(id)}
      />
    </View>
  );
};

Waiter.defaultProps = {
  waiter: {
    id: 0,
    name: 'Name',
    split: 0,
    workingHours: 0,
  },
};

export default Waiter;
