import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headline}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'darkslateblue',
    padding: 15,
  },
  headline: {
    color: 'lightgrey',
    textAlign: 'center',
    fontSize: 30,
  },
});

Header.defaultProps = {
  title: 'Title',
};

export default Header;
