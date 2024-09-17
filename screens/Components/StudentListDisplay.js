import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { studentData } from './studentData'; // Importing the student data

const StudentListDisplay = ({ level, department, strand, gradeLevel, section }) => {
  let students = [];
  console.log('Data Path:', studentData[level]?.[department]?.[gradeLevel]?.[section]);

  // Log the props to ensure they are being passed correctly
  console.log('Props:', { level, department, strand, gradeLevel, section });

  // Determine which student group to show based on the selected level
  if (level === 'JHS') {
    students = studentData.JHS[gradeLevel]?.[section] || [];
  } else if (level === 'SHS') {
    students = studentData.SHS[strand]?.[gradeLevel]?.[section] || [];
  } else if (level === 'College') {
    students = studentData.College[department]?.[gradeLevel]?.[section] || [];
  }

  console.log('Students:', students); // Log the retrieved students

  return (
    <View style={styles.container}>
      {students.length > 0 ? (
        <FlatList
          data={students}
          keyExtractor={(item) => item.telNum} // Ensure this is unique
          renderItem={({ item }) => (
            <View style={styles.studentContainer}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text>Age: {item.age}</Text>
              <Text>Section: {item.section}</Text>
              <Text>Guardian: {item.guardian}</Text>
              <Text>Medical Info:</Text>
              <Text>Respiratory: {item.respiratory}</Text>
              {/* Display other medical info */}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noStudentsText}>No students found for the selected criteria.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  studentContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noStudentsText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default StudentListDisplay;
