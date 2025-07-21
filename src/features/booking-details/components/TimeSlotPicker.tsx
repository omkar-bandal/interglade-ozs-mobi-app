// TimeSlotPicker.tsx
import {Picker} from '@react-native-picker/picker';
import useTheme from '@theme/useTheme';
import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

// Generate next 7 days starting from today (Thursday, April 10, 2025)
const generateNext7Days = () => {
  const days = [];
  // Hardcoded date for April 10, 2025
  const today = new Date(); // Month is 0-indexed in JS (3 = April)

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const day = date.toLocaleDateString('en-US', {weekday: 'short'});
    const dateNum = date.getDate();
    const month = date.toLocaleDateString('en-US', {month: 'short'});

    let label = i === 0 ? 'Today' : day;

    days.push({
      id: `${date.toISOString().split('T')[0]}`,
      label,
      fullDate: `${label}, ${month} ${dateNum}`,
    });
  }

  return days;
};

// Generate time slots from 8 AM to 8 PM
const generateTimeSlots = (availableDays: string[]) => {
  const slots = [];
  if (availableDays.includes('all-day')) {
    for (let hour = 8; hour <= 20; hour++) {
      const hourFormatted = hour > 12 ? hour - 12 : hour;
      const amPm = hour >= 12 ? 'PM' : 'AM';
      slots.push({
        id: `${hour}:00`,
        label: `${hourFormatted}:00 ${amPm}`,
      });
    }
  } else {
    availableDays.forEach(day => {
      if (day !== 'all-day') {
        const [startHour, endHour] = day.split('-').map(Number);
        for (let hour = startHour; hour <= endHour; hour++) {
          const hourFormatted = hour > 12 ? hour - 12 : hour;
          const amPm = hour >= 12 ? 'PM' : 'AM';
          slots.push({
            id: `${hour}:00`,
            label: `${hourFormatted}:00 ${amPm}`,
          });
        }
      }
    });
  }
  return slots;
};

const formatCustomDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString('en-US', {weekday: 'short'});
  const dateNum = date.getDate();
  const month = date.toLocaleDateString('en-US', {month: 'short'});

  return {
    id: dateString,
    label: 'Custom',
    fullDate: `${day}, ${month} ${dateNum}`,
  };
};

const convertTo24Hour = (hour: string, minute: string, period: string) => {
  let hourNum = parseInt(hour);
  if (period === 'PM' && hourNum !== 12) {
    hourNum += 12;
  }
  if (period === 'AM' && hourNum === 12) {
    hourNum = 0;
  }
  return `${hourNum}:${minute}`;
};

const days = generateNext7Days();

interface TimeSlotPickerProps {
  selectedDay: string;
  selectedTimeSlot: string;
  onSelectDay: (day: string) => void;
  onSelectTimeSlot: (timeSlot: string) => void;
  availableDays?: string[];
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDay,
  selectedTimeSlot,
  onSelectDay,
  onSelectTimeSlot,
  availableDays = [],
}) => {
  const timeSlots = generateTimeSlots(availableDays);
  const {theme} = useTheme();
  const styles = themeStyles(theme);

  const [isCustomDayModalVisible, setCustomDayModalVisible] =
    React.useState(false);
  const [isCustomTimeModalVisible, setCustomTimeModalVisible] =
    React.useState(false);

  const [customSelectedDate, setCustomSelectedDate] = React.useState('');
  const [customHour, setCustomHour] = React.useState('10');
  const [customMinute, setCustomMinute] = React.useState('00');
  const [customPeriod, setCustomPeriod] = React.useState('AM');

  // New state variables
  const [customDays, setCustomDays] = React.useState<
    Array<{id: string; label: string; fullDate: string}>
  >([]);
  const [customTimes, setCustomTimes] = React.useState<
    Array<{id: string; label: string}>
  >([]);

  // Combined arrays (place these here, after state declarations)
  const allDays = [...days, ...customDays];
  const allTimeSlots = [...timeSlots, ...customTimes];
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Select Day Day</Text>
          <TouchableOpacity onPress={() => setCustomDayModalVisible(true)}>
            <Text style={styles.sectionTitle}>Custom Day</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daysContainer}>
          {/* {days.map(day => (
            <TouchableOpacity
              key={day.id}
              style={[
                styles.dayItem,
                selectedDay === day.id && styles.selectedDayItem,
              ]}
              onPress={() => onSelectDay(day.id)}>
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day.id && styles.selectedDayText,
                ]}>
                {day.label}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDay === day.id && styles.selectedDayText,
                ]}>
                {day.id.split('-')[2]}
              </Text>
            </TouchableOpacity>
          ))} */}

          {allDays.map(day => (
            <TouchableOpacity
              key={day.id}
              style={[
                styles.dayItem,
                selectedDay === day.id && styles.selectedDayItem,
                [],
              ]}
              onPress={() => onSelectDay(day.id)}>
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day.id && styles.selectedDayText,
                ]}>
                {day.label}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDay === day.id && styles.selectedDayText,
                ]}>
                {day.id.includes('-') ? day.id.split('-')[2] : day.fullDate}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Time Slots Selector */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <TouchableOpacity onPress={() => setCustomTimeModalVisible(true)}>
            <Text style={styles.sectionTitle}>Custom Time</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeSlotsContainer}>
          {/* {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={`${slot.id}-${index}`}
              style={[
                styles.timeSlotChip,
                selectedTimeSlot === slot.id && styles.selectedTimeSlotChip,
              ]}
              onPress={() => onSelectTimeSlot(slot.id)}>
              <Text
                style={[
                  styles.timeSelectText,
                  selectedTimeSlot === slot.id && styles.selectedTimeSlotText,
                ]}>
                {slot.label}
              </Text>
            </TouchableOpacity>
          ))} */}
          {/* .filter((_, index) => index % 4 !== 0) */}
          {allTimeSlots.map((slot, index) => (
              <TouchableOpacity
                key={`${slot.id}-${index}`}
                style={[
                  styles.timeSlotChip,
                  selectedTimeSlot === slot.id && styles.selectedTimeSlotChip,
                ]}
                onPress={() => onSelectTimeSlot(slot.id)}>
                <Text
                  style={[
                    styles.timeSelectText,
                    selectedTimeSlot === slot.id && styles.selectedTimeSlotText,
                  ]}>
                  {slot.label}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      {/* Custom day selector */}
      <Modal
        visible={isCustomDayModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCustomDayModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={day => setCustomSelectedDate(day.dateString)}
              //onDayPress={day => onSelectDay(day.dateString)}
              markedDates={{
                [customSelectedDate]: {
                  selected: true,
                  selectedColor: theme.colors.primary,
                },
              }}
            />
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                if (customSelectedDate) {
                  // Add to custom days if not already exists
                  const customDay = formatCustomDate(customSelectedDate);
                  setCustomDays(prev => {
                    const exists = prev.find(day => day.id === customDay.id);
                    if (!exists) {
                      return [...prev, customDay];
                    }
                    return prev;
                  });

                  onSelectDay(customSelectedDate);
                  setCustomDayModalVisible(false);
                }
              }}>
              <Text style={styles.okText}>Select Day</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Custom Time */}
      <Modal
        visible={isCustomTimeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCustomTimeModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Pick a Time</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Picker
                selectedValue={customHour}
                onValueChange={setCustomHour}
                style={styles.picker}>
                {Array.from({length: 12}, (_, i) => {
                  const val = String(i + 1).padStart(2, '0');
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={val}
                      style={styles.timeSlotText}
                    />
                  );
                })}
              </Picker>
              <Picker
                selectedValue={customMinute}
                onValueChange={setCustomMinute}
                style={styles.picker}>
                {['00', '15', '30', '45'].map(m => (
                  <Picker.Item
                    key={m}
                    label={m}
                    value={m}
                    style={styles.timeSlotText}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={customPeriod}
                onValueChange={setCustomPeriod}
                style={styles.picker}>
                {['AM', 'PM'].map(p => (
                  <Picker.Item
                    key={p}
                    label={p}
                    value={p}
                    style={styles.timeSlotText}
                  />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                const formatted = `${customHour}:${customMinute} ${customPeriod}`;
                const timeId = convertTo24Hour(
                  customHour,
                  customMinute,
                  customPeriod,
                );

                // Add to custom times if not already exists
                const customTime = {id: timeId, label: formatted};
                setCustomTimes(prev => {
                  const exists = prev.find(time => time.id === customTime.id);
                  if (!exists) {
                    return [...prev, customTime];
                  }
                  return prev;
                });

                onSelectTimeSlot(timeId);
                setCustomTimeModalVisible(false);
              }}>
              <Text style={styles.okText}>Apply Time</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 8,
      //backgroundColor: 'red',
    },
    sectionTitleContainer: {
      paddingHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.textSecondary,
    },
    daysContainer: {
      flexDirection: 'row',
      paddingLeft: 16,
      paddingRight: 8,
      marginBottom: 16,
    },
    dayItem: {
      width: 70,
      height: 70,
      borderRadius: 8,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    selectedDayItem: {
      backgroundColor: theme.colors.primary,
    },
    dayText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#555555',
    },
    dateText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
      marginTop: 4,
    },
    selectedDayText: {
      color: '#FFFFFF',
    },
    timeSlotsContainer: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    timeSlotChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#F5F5F5',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    selectedTimeSlotChip: {
      backgroundColor: theme.colors.primary,
      //borderColor: '#FFC163',
    },
    timeSlotText: {
      fontSize: 16,
      color: theme.colors.textInverse,
    },
    timeSelectText: {
      fontSize: 16,
      color: '#343434',
    },
    selectedTimeSlotText: {
      color: '#FFFFFF',
      fontWeight: '500',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      padding: 20,
      backgroundColor: theme.colors.card,
      borderRadius: 10,
    },
    okButton: {
      marginTop: 20,
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    okText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    picker: {
      width: 100,
      height: 50,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.primary,
      margin: 5,
    },
  });

export default TimeSlotPicker;
