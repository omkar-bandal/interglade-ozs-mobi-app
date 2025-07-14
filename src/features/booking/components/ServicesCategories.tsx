/* eslint-disable react-native/no-inline-styles */
import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';
import {
  useGetAllSubCategoriesByID,
  useGetCategoriesByType,
} from '@hooks/api/category.rq';
import {SPACING} from '@theme/constants';
import useTheme from '@theme/useTheme';
import {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {ServiceCategoriesCard} from './card/ServiceCategoriesCard';

export const ServicesCategories = () => {
  const {theme} = useTheme();
  const styles = themeStyles(theme);
  const {data, isLoading} = useGetCategoriesByType('service');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const {data: subCategoriesData, isLoading: isSubCategoriesLoading} =
    useGetAllSubCategoriesByID(selectedCategoryId ?? 0, 'service');

  const categories = data?.data ?? [];

  const selectedCategory = categories.find(
    (cat: {id: null}) => cat.id === selectedCategoryId,
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#65B0A9" />;
  }

  const handleCategory = (id: any) => {
    setSelectedCategoryId(id);
    //Alert.alert(JSON.stringify(subCategoriesData));
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Typography variant="h5" weight="bold">
          Service Categories
        </Typography>

        <Button
          label="See All"
          size="small"
          variant="ghost"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={styles.services}>
        <ServiceCategoriesCard items={data?.data} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedCategoryId(selectedCategory);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.categoryList}>
              <ScrollView>
                {categories.map((category: any) => (
                  <Pressable
                    key={category.id}
                    onPress={() => handleCategory(category.id)}
                    style={[
                      styles.categoryItem,
                      selectedCategoryId === category.id &&
                        styles.selectedCategoryItem,
                    ]}>
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={styles.subcategoryList}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.subcategoryTitle}>Subcategories</Text>

                <Button
                  //label="Close"
                  variant="outline"
                  size="small"
                  leftIcon={
                    <AntDesignIcon name="close" size={14} color="#00695C" />
                    //color="#393872"
                  }
                  onPress={() => {
                    setModalVisible(false);
                    //setSelectedCategoryId(null);
                  }}
                  //style={styles.closeButton}
                />
              </View>
              <ScrollView>
                {selectedCategory?.children?.length > 0 ? (
                  selectedCategory.children.map((sub: any) => (
                    <Text key={sub.id} style={styles.subcategoryText}>
                      {sub.name}
                    </Text>
                  ))
                ) : (
                  <>
                    {/* <Text style={styles.subcategoryText}>
                      Select a category
                    </Text> */}
                    {subCategoriesData?.data?.map((sabCat: any) => (
                      <Text key={sabCat.id} style={styles.subcategoryText}>
                        {sabCat.name}
                      </Text>
                    ))}
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const themeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: SPACING.md,
    },
    services: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
      justifyContent: 'center',
      paddingVertical: SPACING.sm,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //paddingHorizontal: 15,
      marginBottom: 10,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      paddingTop: 10,
      height: '80%',
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: 'hidden',
    },
    categoryList: {
      width: '40%',
      backgroundColor: theme.components.card.backgroundColor,
      padding: 10,
    },
    subcategoryList: {
      width: '60%',
      padding: 10,
    },
    categoryItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    selectedCategoryItem: {
      backgroundColor: theme.colors.primaryLight,
    },
    categoryText: {
      fontSize: 16,
      color: theme.colors.textTertiary,
    },
    subcategoryTitle: {
      fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 16,
      color: theme.colors.primary,
    },
    subcategoryText: {
      fontSize: 14,
      paddingVertical: 6,
      //fontWeight: '500',
      color: theme.colors.textTertiary,
    },
  });
