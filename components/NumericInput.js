import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NumericInput = ({
  value,
  onChange,
  steps,
  placeholder,
  style,
  iconStyle,
}) => {
  const [displayText, setDisplayText] = useState(value.toString());
  const [lastSubmitted, setLastSubmitted] = useState(value);
  useEffect(() => {
    if (displayText.match(/^-?\d+(\.\d+)?$/)) {
      onChange(Number.parseFloat(displayText));
      setLastSubmitted(Number.parseFloat(displayText));
    }
  }, [displayText]);

  return (
    <View style={[{flex: 1}, style, {flexDirection: 'row'}]}>
      {steps && (
        <TouchableOpacity style={[{flex: 1, flexDirection: 'row'}]}>
          <Icon
            name="minus"
            style={[iconStyle]}
            onPress={() => {
              setDisplayText(lastSubmitted - steps + '');
            }}
          />
        </TouchableOpacity>
      )}
      <TextInput
        style={[{flex: 1, textAlign: 'center'}]}
        keyboardType="numeric"
        value={displayText}
        onChangeText={text => {
          if (text.startsWith('.')) {
            text = '0' + text;
          }
          if (text.match(/^-?\d*(\.\d*)?$/)) {
            setDisplayText(text);
          }
        }}
        placeholder={placeholder}
      />
      {steps && (
        <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}>
          <Icon
            name="plus"
            style={[iconStyle]}
            onPress={() => {
              setDisplayText(lastSubmitted + steps + '');
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

NumericInput.defaultProps = {
  onChange: () => {},
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default NumericInput;
