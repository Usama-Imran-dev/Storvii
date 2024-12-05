import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingScreen = ({navigation}: {navigation: any}) => {
  const [reputationLevel, setReputationLevel] = useState(90);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header Back Icon */}
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: 'https://example.com/profile-image.png',
            }}
            style={styles.profileImage}
          />
          {/* Edit Icon Positioned on Top of Image */}
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="pencil" style={styles.editText} />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Johnalley</Text>
        <View style={styles.reputationContainer}>
          <Text style={styles.reputationLabel}>Reputation Level</Text>
          <Text style={styles.reputationValue}>{reputationLevel}</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuOptions}>
        {[
          {label: 'Profile', icon: 'user', screen: 'Profile'},
          {label: 'Account', icon: 'key', screen: 'Account'},
          {label: 'Store', icon: 'shopping-bag', screen: 'Store'},
          {label: 'Help', icon: 'question-circle', screen: 'Help'},
          {label: 'About', icon: 'info-circle', screen: 'About'},
          {label: 'Logout', icon: 'sign-out', screen: 'Login'},
        ].map((option, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={
                option.label === 'Logout'
                  ? handleLogout
                  : () => navigation.navigate(option.screen)
              }>
              <Icon name={option.icon} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{option.label}</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E7',
    padding: 16,
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backText: {
    fontSize: 40, // Adjusted to 24
    color: '#333',
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageWrapper: {
    position: 'relative',
    width: 150,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EFC078',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: '#FFE3C0',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: '#EFC078',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  editText: {
    fontSize: 24, // Adjusted to 24
    color: '#000',
  },
  profileName: {
    marginTop: 12,
    fontSize: 24, // Adjusted to 24
    fontWeight: 'bold',
    color: '#333',
  },
  reputationContainer: {
    flexDirection: 'row',
    marginTop: 22,
    paddingVertical: 19,
    paddingHorizontal: 30,
    borderRadius: 55,
    backgroundColor: '#FFE3C0',
    paddingLeft: 15,
    justifyContent: 'space-between',
    width: '80%',
  },
  reputationLabel: {
    fontSize: 24, // Adjusted to 24
    color: '#000',
  },
  reputationValue: {
    fontSize: 24, // Adjusted to 24
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  menuOptions: {
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIcon: {
    fontSize: 24, // Adjusted to 24
    marginRight: 16,
    color: '#000',
  },
  menuLabel: {
    fontSize: 24, // Adjusted to 24
    color: '#000',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EFC078',
    marginVertical: 4,
  },
});

export default SettingScreen;
