// TimeSlotPicker.tsx
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Select Day</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daysContainer}>
          {days.map(day => (
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
          ))}
        </ScrollView>

        {/* Time Slots Selector */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Select Time</Text>
        </View>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={`${slot.id}-${index}`}
              style={[
                styles.timeSlotChip,
                selectedTimeSlot === slot.id && styles.selectedTimeSlotChip,
              ]}
              onPress={() => onSelectTimeSlot(slot.id)}>
              <Text
                style={[
                  styles.timeSlotText,
                  selectedTimeSlot === slot.id && styles.selectedTimeSlotText,
                ]}>
                {slot.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  sectionTitleContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
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
    backgroundColor: '#FFC163',
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
    backgroundColor: '#FFC163',
    borderColor: '#FFC163',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default TimeSlotPicker;
