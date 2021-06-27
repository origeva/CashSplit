import React, {useContext} from 'react';
import {View, Text, Switch, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SettingsContext from '../contexts/SettingsContext';

const Settings = () => {
  const {settings, setSettings} = useContext(SettingsContext);
  return (
    <View>
      <View>
        {Object.keys(settings).map((key, keyIndex) => {
          return (
            <Setting
              key={keyIndex}
              name={settings[key].name}
              value={settings[key].value}
              setSetting={value => {
                let temp = {};
                temp[key] = {...settings[key], value};
                setSettings({
                  ...settings,
                  ...temp,
                });
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const Setting = ({name, value, setSetting}) => {
  return (
    <TouchableOpacity style={[styles.setting]}>
      <Text style={[styles.text]}>{name}</Text>
      {typeof value === 'boolean' && (
        <Switch
          style={[styles.value]}
          value={value}
          onValueChange={setSetting}
        />
      )}
      {typeof value === 'number' && <Text style={styles.value}>{value}</Text>}
      {typeof value === 'string' && (
        <Text style={styles.value}>
          {value}
          <MaterialIcon name="settings" />
        </Text>
      )}
    </TouchableOpacity>
  );
};

// const NumericPreference = ({name, value, setPreference}) => {
//   return (
//     <TouchableOpacity>
//       <View style={[styles.view]}>
//         <Text style={[styles.text]}>{name}</Text>
//         <Switch
//           style={[styles.value]}
//           value={preferences[key]}
//           onValueChange={setPreference}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const StringPreference = ({name, value, setPreference}) => {
//   return (
//     <TouchableOpacity>
//       <View style={[styles.view]}>
//         <Text style={[styles.text]}>{name}</Text>
//         <Switch
//           style={[styles.value]}
//           value={preferences[key]}
//           onValueChange={setPreference}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
  },
  text: {
    flex: 4,
    textAlign: 'center',
  },
  value: {
    flex: 2,
    alignSelf: 'center',
  },
});

export default Settings;
