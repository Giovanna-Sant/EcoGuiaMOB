import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Animated } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons'; 
import { BannerReciclavel } from '../../assets';

const { width, height } = Dimensions.get('window');

const ReciclavelPage = () => {
  const [expanded, setExpanded] = useState({});
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  const handleExpand = (category) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [category]: !prevExpanded[category],
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <BannerReciclavel
      style={[styles.bannerContainer]}
      maxWidth={'100%'}
    />


        <View style={styles.content}>
          <Text style={styles.description}>
            São materiais que podem ser descartados corretamente no lixo reciclável e destinados à reciclagem:
          </Text>
          <CategoryContainer
            category="Metais"
            items={['Fios de cobre', 'Latas de bebidas e alimentos', 'Panelas sem cabo']}
            expanded={expanded['Metais']}
            onToggleExpand={() => handleExpand('Metais')}
            color="#FFC107"
          />
          <CategoryContainer
            category="Papéis"
            items={['Jornais', 'Revistas', 'Papéis de escritório']}
            expanded={expanded['Papéis']}
            onToggleExpand={() => handleExpand('Papéis')}
            color="#42A5F5"
          />
          <CategoryContainer
            category="Vidros"
            items={['Garrafas de vidro', 'Frascos de remédios', 'Potes de vidro']}
            expanded={expanded['Vidros']}
            onToggleExpand={() => handleExpand('Vidros')}
            color="#66BB6A"
          />
          <CategoryContainer
            category="Plásticos"
            items={['Garrafas PET', 'Sacolas plásticas', 'Embalagens']}
            expanded={expanded['Plásticos']}
            onToggleExpand={() => handleExpand('Plásticos')}
            color="#EF5350"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const CategoryContainer = ({ category, items, expanded, onToggleExpand, color }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const arrowStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity onPress={onToggleExpand} style={styles.categoryHeader}>
        <View style={[styles.bullet, { backgroundColor: color }]} />
        <Text style={styles.categoryText}>{category}</Text>
        <Animated.View style={arrowStyle}>
          <Ionicons name="chevron-down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>
      {expanded ? (
        <View>
          <SubList items={items} color={color} />
          <View style={styles.categorySeparator} />
        </View>
      ) : (
        <View style={styles.categorySeparator} />
      )}
    </View>
  );
};

const SubList = ({ items, color }) => (
  <View style={styles.subList}>
    {items.map((item, index) => (
      <RecyclableItem key={index} item={item} color={color} />
    ))}
  </View>
);

const RecyclableItem = ({ item, color }) => (
  <View style={styles.subItemContainer}>
    <View style={[styles.subItemBullet, { backgroundColor: color }]} />
    <Text style={styles.subItemText}>{item}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 85,
  },

  content: {
    paddingHorizontal: 10,  
  },

  bannerContainer: {
    marginVertical: -70
  },


  

  description: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    textAlign: 'center',
    color: '#3F463E',
    paddingHorizontal: '5%',
    marginBottom: '5%',
  },

  categoryContainer: {
    marginBottom: 15,
  },
  
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  categoryText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    flex: 1,
  },
  
  bullet: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  
  subList: {
    paddingLeft: 35,
  },
  
  subItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  
  subItemBullet: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  
  subItemText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333',
  },
  
  categorySeparator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
    marginLeft: 15,
  },
});

export default ReciclavelPage;
