import React, { useState, useEffect, useCallback, FunctionComponent } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Button,
  TextInput,
  Pressable,
  Modal,
  Platform
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import moment from "moment";
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'react-native-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";




const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const navigation = useNavigation();
  const [itemName, setItemName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [expiredDate, setExpiredDate] = useState('');
  const [manufactors, setManufactors] = useState("");
  const [counter, setCounter] = useState(1);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [expired, setExpired] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = React.useState('');
  const [editMode, setEditMode] = useState(false);
  const [originalExpiredDate, setOriginalExpiredDate] = useState('');
  const [status, setStatus] = useState(""); // New state for status
  const [startingCount, setStartingCount] = useState(0);


  const API_URL = 'http://192.168.1.8:3000/inventory'

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      setInventory(data);
      await AsyncStorage.setItem('inventory', JSON.stringify(data));
    } catch (err) {
      console.error("Error:", err);
      const cachedData = await AsyncStorage.getItem('inventory');
      if (cachedData) {
        setInventory(JSON.parse(cachedData));
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);


  // Delete EndPoint
  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`${API_URL}/item/${itemId}`);
      if (response.status === 200) {
        setInventory(inventory.filter((item) => item._id !== itemId));
        Alert.alert("Item deleted successfully.");
      }
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Failed to delete item. Please try again later.");
    }
  };

  // Search ENDPOINT
  const handleSearch = () => {
    axios
      .get(`http://192.168.1.3:3000/search?q=${itemName}`)
      .then((response) => {
        setSearchResults(response.data);
        setInventory(response.data);
        setSearched(true);
      })
      .catch((error) => {
        console.error("Error searching:", error);
      });
  };
  // Pupunta sa add screen
  const handlePress = useCallback((event, item) => {
    event.persist(); // Preserve the synthetic event
    navigation.navigate("Add", { item });
  }, [navigation]);

  const handlepost = useCallback((event, item) => {
    event.persist(); // Preserve the synthetic event
    navigation.navigate("post", { item });
  }, [navigation]);


  // Message kapag walang nakitang result sa sinearch
  const NoResultsMessage = () => (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>No results found</Text>
    </View>
  );

  const handleEdit = () => {
    setEditModalVisible(false);
    // Set the original expiration date when entering edit mode
    setOriginalExpiredDate(expiredDate);
    // No need to format the date here since it's already formatted
    console.log("Updated expiredDate:" + expiredDate);
    axios
      .put(`http://192.168.1.8:3000/item/${editedItem._id}`, {
        itemName: editedItem.itemName,
        quantity: editedItem.quantity,
        expiredDate: expiredDate,
        manufactors: editedItem.manufactors,
        status: editedItem.status,
      })
      .then((response) => {
        if (response.status === 200) {

          setInventory(
            inventory.map((item) =>
              item._id === editedItem._id ? response.data.updatedItem : item
            )
          );
          Alert.alert("Item updated successfully.");

        }
      })
      .catch((error) => {
        console.error("Error updating:", error);
        Alert.alert("Failed to update item. Please try again later.");
      });
  };


  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      // Ensure the date is in local time
      const localDate = moment(currentDate).local();
      setDate(localDate.toDate());
      setExpiredDate(localDate.format('MMM DD YYYY'));
    }
    toggleDatePicker();
  };

  const calculateExpiration = () => {
    const diff = moment(expiredDate, 'MMM DD YYYY').diff(moment(), 'days');
    setExpired(diff < 0); // Set expired to true if the item is expired
  };

  useEffect(() => {
    calculateExpiration();
  }, [expiredDate]);

  // PARA SA EXPIRATION DATE MAG RERED ANG TEXT KAPAG MALAPIT NA MAG EXPIRED
  const renderItem = ({ item, index }) => {
    const expirationDate = moment(item.expiredDate, "YYYY-MM-DDTHH:mm:ssZ").local();
    const today = moment().local();
    const oneMonthFromNow = today.add(1, "months");
    const isExpired = expirationDate.isBefore(oneMonthFromNow);
    // Your rendering logic here


    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { width: 100 }]}>{item.itemName}</Text>
        <Text style={[styles.cell, { width: 90 }]}>{item.startingCount}</Text>
        <Text style={[styles.cell, { width: 90 }]}>{item.quantity}</Text>
        <Text style={[styles.cell, { width: 110, color: isExpired ? "red" : "green" }]}>
          {expirationDate.format("MMM DD YYYY")}
        </Text>
        <Text style={[styles.cell, { width: 175 }]}>{item.manufactors}</Text>

        <TouchableOpacity style={{ width: 20 }} onPress={() => deleteItem(item._id)}>
          <AntDesign name="delete" size={17} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 30, marginLeft: 10 }}
          onPress={() => {
            setEditedItem(item);
            setEditModalVisible(true);
          }}
        >
          <Feather name="edit" size={17} color="black" />
        </TouchableOpacity>
      </View>
    );
  };


  return (

    <ScrollView horizontal={false}>

      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 20
          }}
        >

          Clinic Inventory
        </Text>
        <View style={{ backgroundColor: "white" }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
            {/* Search */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                height: 40,
                borderRadius: 3,
                flex: 1
              }}
            >

              <TextInput
                style={{
                  borderRadius: 90,
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  width: "50%",
                  paddingLeft: 40, // Adjust the padding to accommodate the icon
                  paddingRight: 10, // Adjust the padding to accommodate the text
                }}
                placeholder="Search"
                value={itemName}
                onChangeText={(text) => setItemName(text)}
              />
              <FontAwesome
                name="search"
                size={24}
                color="lightgray"
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 10,
                  zIndex: 1,
                  alignContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
              />


              {/* sa ano na toh pag pinindot yung "search" */}
              <Pressable
                onPress={handleSearch}
                style={({ pressed }) => [
                  {
                    padding: 10,
                    borderRadius: 50,
                    backgroundColor: pressed ? "rgb(210, 230, 255)" : "#ADD8E6"
                  }
                ]}
              >
                <Text style={{ color: "black" }}>Enter</Text>
              </Pressable>
            </View>

            {/* Add Button */}
            <TouchableOpacity
              style={{ width: 30 }}
              onPress={handlePress}
            >
              <FontAwesome
                style={{ marginTop: 11, marginRight: 0 }}
                name="plus-square-o"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 30 }}
              onPress={handlepost}
            >
              <FontAwesome
                style={{ marginTop: 11, marginRight: 0 }}
                name="plus-square-o"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal={true}>
          {/* Table */}
          <View style={styles.Listcontainer}>
            <View style={styles.header}>
              <Text style={[styles.headerText, { width: 90 }]}>Item Name</Text>
              <Text style={[styles.headerText, { width: 120 }]}>Starting Count</Text>
              <Text style={[styles.headerText, { width: 90 }]}>Current Quantity</Text>
              <Text style={[styles.headerText, { width: 120 }]}>
                Expiration Date
              </Text>
              <Text style={[styles.headerText, { width: 120 }]}>Created At</Text>
              <Text style={[styles.headerText, { width: 120 }]}>Manufacturer</Text>
              <Text style={[styles.headerText, { width: 100 }]}>Settings</Text>
            </View>
            {searched && searchResults.length === 0 && <NoResultsMessage />}
            {!isLoading && inventory.length > 0 && (
              <FlatList
                data={inventory}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.Listcontainer}
              />
            )}
            {isLoading && <Text>Loading...</Text>}
          </View>
        </ScrollView>
        {/* Edit Modal */}
        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setEditModalVisible(!editModalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Edit Item</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Item Name</Text>
                <TextInput
                  style={[styles.input, { width: "100%" }]} // Expanding the input field
                  placeholder="Item Name"
                  value={editedItem.itemName}
                  onChangeText={(text) => setEditedItem({ ...editedItem, itemName: text })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Quantity</Text>
                <TextInput
                  style={[styles.input, { width: "100%" }]} // Expanding the input field
                  placeholder="Quantity"
                  value={editedItem.quantity ? editedItem.quantity.toString() : ''}
                  onChangeText={(number) => setEditedItem({ ...editedItem, quantity: number })}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Expiration Date</Text>
                <View style={[styles.inputWithBorder, { flexDirection: 'row', alignItems: 'center' }]}>
                  <TouchableOpacity onPress={toggleDatePicker}>
                    <AntDesign style={styles.icon} name="calendar" size={24} color="black" />
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.calendar, styles.calendarInput]}
                    placeholder="Expiration Date"
                    value={editMode ? originalExpiredDate : expiredDate} // Use originalExpiredDate in edit mode
                    editable={false}
                  />
                </View>
                {datePickerVisible && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={onChange}
                    minimumDate={new Date()}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Manufacturer</Text>
                <TextInput
                  style={[styles.input, { width: "100%" }]} // Expanding the input field
                  placeholder="Manufacturer"
                  value={editedItem.manufactors}
                  onChangeText={(text) => setEditedItem({ ...editedItem, manufactors: text })}
                />
              </View>
              <View style={styles.modalButtonsContainer}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "rgb(210, 230, 255)" : "white"
                    },
                    styles.modalButton
                  ]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "rgb(210, 230, 255)" : "white"
                    },
                    styles.modalButton
                  ]}
                  onPress={handleEdit}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  divider: {
    height: 16,
    borderLeftWidth: 1,
    borderLeftColor: "black",
    marginVertical: 8,
    marginHorizontal: 10
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50
  },
  Listcontainer: {
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%"
  },
  headerText: {
    fontSize: 15,
    textAlign: "center",
    flex: 1
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 8,
    marginHorizontal: 1,
    elevation: 3,
    borderRadius: 30,
    paddingVertical: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    width: "100%",
    padding: 20
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15
  },
  inputContainer: {
    flexDirection: "column",

    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  inputLabel: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    alignSelf: "stretch",
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#ADD8E6",
    paddingHorizontal: 10,
    paddingRight: 130,
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: "70%"
  },
  calendar: {
    alignSelf: "stretch",
    height: 40,
    paddingLeft: 10,
    width: "100%",
  },
  icon: {
    marginRight: 5,
    margin: 6
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20
  },
  modalButton: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    width: "45%",
    backgroundColor: "#ADD8E6",

  },
  modalButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  calendarInput: {
    flex: 1,
    marginLeft: 5,
    maxWidth: "100%"
  },
  inputWithBorder: {
    borderBottomWidth: 1,
    borderColor: "#ADD8E6",
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  datePressable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#ADD8E6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingRight: 100,

  },
});

export default Inventory;
