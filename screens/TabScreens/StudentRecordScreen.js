import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategorySelector from '../Components/CategorySelector';
import GradePicker from '../Components/GradePicker';
import SectionPicker from '../Components/SectionPicker';
import StrandPicker from '../Components/StrandPicker';
import CoursePicker from '../Components/CoursePIcker'; // Fixed import
import { Picker } from '@react-native-picker/picker';
import StudentListDisplay from '../Components/StudentListDisplay'; // Import StudentListDisplay
import Colors from '../../constants/Colors';

const StudentRecordScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedStrand, setSelectedStrand] = useState(null); // For SHS
  const [selectedDepartment, setSelectedDepartment] = useState(null); // For College
  const [selectedCourse, setSelectedCourse] = useState(null); // For College

  // Updated section options for JHS, SHS, and College
  const sectionOptions = {
    JHS: {
      'Grade 7': ['Sample gr 7', 'Sample gr 7-2'],
      'Grade 8': ['Sample gr 8', 'Sample gr 8-2'],
      'Grade 9': ['Sample gr 9', 'Sample gr 9-2'],
      'Grade 10': ['Sample gr 10', 'Sample gr 10-2'],
    },
    SHS: {
      HUMSS: {
        'Grade 11': ['Sample HUMSS 11-1', 'Sample HUMSS 11-2'],
        'Grade 12': ['Sample HUMSS 12-1', 'Sample HUMSS 12-2'],
      },
      STEM: {
        'Grade 11': ['Sample STEM 11-1', 'Sample STEM 11-2'],
        'Grade 12': ['Sample STEM 12-1', 'Sample STEM 12-2'],
      },
      ABM: {
        'Grade 11': ['Sample ABM 11-1', 'Sample ABM 11-2'],
        'Grade 12': ['Sample ABM 12-1', 'Sample ABM 12-2'],
      },
    },
    College: {
      COI: {
        BSCS: {
          '1st Year': ['BSCS 1A', 'BSCS 1B'],
          '2nd Year': ['BSCS 2A', 'BSCS 2B'],
          '3rd Year': ['BSCS 3A', 'BSCS 3B'],
          '4th Year': ['BSCS 4A', 'BSCS 4B'],
        },
        IT: {
          '1st Year': ['IT 1A', 'IT 1B'],
          '2nd Year': ['IT 2A', 'IT 2B'],
          '3rd Year': ['IT 3A', 'IT 3B'],
          '4th Year': ['IT 4A', 'IT 4B'],
        },
      },
      CHTM: {
        Tourism: {
          '1st Year': ['Tourism 1A', 'Tourism 1B'],
          '2nd Year': ['Tourism 2A', 'Tourism 2B'],
          '3rd Year': ['Tourism 3A', 'Tourism 3B'],
          '4th Year': ['Tourism 4A', 'Tourism 4B'],
        },
        HospitalityManagement: {
          '1st Year': ['HM 1A', 'HM 1B'],
          '2nd Year': ['HM 2A', 'HM 2B'],
          '3rd Year': ['HM 3A', 'HM 3B'],
          '4th Year': ['HM 4A', 'HM 4B'],
        },
      },
      CBAA: {
        Accountancy: {
          '1st Year': ['Accountancy 1A', 'Accountancy 1B'],
          '2nd Year': ['Accountancy 2A', 'Accountancy 2B'],
          '3rd Year': ['Accountancy 3A', 'Accountancy 3B'],
          '4th Year': ['Accountancy 4A', 'Accountancy 4B'],
        },
        BusinessAdministration: {
          '1st Year': ['BA 1A', 'BA 1B'],
          '2nd Year': ['BA 2A', 'BA 2B'],
          '3rd Year': ['BA 3A', 'BA 3B'],
          '4th Year': ['BA 4A', 'BA 4B'],
        },
        Marketing: {
          '1st Year': ['Marketing 1A', 'Marketing 1B'],
          '2nd Year': ['Marketing 2A', 'Marketing 2B'],
          '3rd Year': ['Marketing 3A', 'Marketing 3B'],
          '4th Year': ['Marketing 4A', 'Marketing 4B'],
        },
      },
    },
  };

  const courseOptions = selectedDepartment ? Object.keys(sectionOptions.College[selectedDepartment]) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Student Record Archives</Text>

      {/* CategorySelector */}
      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setSelectedGrade(null);
          setSelectedSection(null);
          setSelectedStrand(null);
          setSelectedDepartment(null);
          setSelectedCourse(null);
        }}
      />

      {/* GradePicker */}
      {selectedCategory && (
        <GradePicker
          selectedCategory={selectedCategory}
          selectedGrade={selectedGrade}
          onSelectGrade={(grade) => {
            setSelectedGrade(grade);
            setSelectedSection(null);
            setSelectedStrand(null);
            setSelectedDepartment(null);
            setSelectedCourse(null);
          }}
        />
      )}

      {/* College flow */}
      {selectedCategory === 'College' && selectedGrade && (
        <>
          {/* DepartmentPicker */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDepartment}
              onValueChange={(itemValue) => {
                setSelectedDepartment(itemValue);
                setSelectedCourse(null);
                setSelectedSection(null);
              }}
            >
              <Picker.Item label="Select Department" value={null} />
              {['COI', 'CHTM', 'CBAA'].map((department) => (
                <Picker.Item key={department} label={department} value={department} />
              ))}
            </Picker>
          </View>

          {/* CoursePicker */}
          {selectedDepartment && (
            <CoursePicker
              selectedCourse={selectedCourse}
              courseOptions={courseOptions}
              onSelectCourse={(course) => {
                setSelectedCourse(course);
                setSelectedSection(null);
              }}
            />
          )}

          {/* SectionPicker */}
          {selectedCourse && selectedGrade && (
            <SectionPicker
              selectedCategory={selectedCategory}
              selectedGrade={selectedGrade}
              selectedSection={selectedSection}
              sectionOptions={sectionOptions.College[selectedDepartment][selectedCourse][selectedGrade]}
              onSelectSection={setSelectedSection}
            />
          )}
        </>
      )}

      {/* SHS flow */}
      {selectedCategory === 'SHS' && selectedGrade && (
        <>
          <StrandPicker
            selectedStrand={selectedStrand}
            onSelectStrand={setSelectedStrand}
          />
          {selectedStrand && selectedGrade && (
            <SectionPicker
              selectedCategory={selectedCategory}
              selectedGrade={selectedGrade}
              selectedSection={selectedSection}
              sectionOptions={sectionOptions[selectedCategory][selectedStrand][selectedGrade]}
              onSelectSection={setSelectedSection}
            />
          )}
        </>
      )}

      {/* JHS flow */}
      {selectedCategory === 'JHS' && selectedGrade && (
        <SectionPicker
          selectedCategory={selectedCategory}
          selectedGrade={selectedGrade}
          selectedSection={selectedSection}
          sectionOptions={sectionOptions[selectedCategory][selectedGrade]}
          onSelectSection={setSelectedSection}
        />
      )}

      {/* Render StudentListDisplay after all necessary selections */}
      {selectedCategory && selectedGrade && selectedSection && (
        <StudentListDisplay
          level={selectedCategory}
          department={selectedDepartment}
          strand={selectedStrand}
          gradeLevel={selectedGrade}
          section={selectedSection}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 0,
    marginBottom: 10,
  },
});

export default StudentRecordScreen;
