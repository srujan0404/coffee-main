import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  FlatList,
  Dimensions,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data) => {
  let temp = {};
  data.forEach(item => {
    temp[item.name] = temp[item.name] ? temp[item.name] + 1 : 1;
  });
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category, data) => {
  return category === 'All' ? data : data.filter(item => item.name === category);
};

const HomeScreen = ({navigation}) => {
  const CoffeeList = useStore((state) => state.CoffeeList);
  const BeanList = useStore((state) => state.BeanList);
  const addToCart = useStore((state) => state.addToCart);
  const calculateCartPrice = useStore((state) => state.calculateCartPrice);

  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({index: 0, category: categories[0]});
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categories[0], CoffeeList));

  const ListRef = useRef();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search) => {
    if (search) {
      ListRef.current.scrollToOffset({animated: true, offset: 0});
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee(CoffeeList.filter(item => item.name.toLowerCase().includes(search.toLowerCase())));
    }
  };

  const resetSearchCoffee = () => {
    ListRef.current.scrollToOffset({animated: true, offset: 0});
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee(CoffeeList);
    setSearchText('');
  };

  const CoffeCardAddToCart = (item) => {
    addToCart(item);
    calculateCartPrice();
    ToastAndroid.showWithGravity(`${item.name} is Added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />

        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}coffee for you
        </Text>

        {/* Search Input */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcon
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={searchText ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Coffee..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText ? (
            <TouchableOpacity onPress={resetSearchCoffee}>
              <CustomIcon style={styles.InputIcon} name="close" size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Category Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef.current.scrollToOffset({animated: true, offset: 0});
                  setCategoryIndex({index, category: categories[index]});
                  setSortedCoffee(getCoffeeList(categories[index], CoffeeList));
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index === index ? {color: COLORS.primaryOrangeHex} : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index === index ? <View style={styles.ActiveCategory} /> : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee Flatlist */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.push('Details', {index: item.index, id: item.id, type: item.type})}>
              <CoffeeCard {...item} buttonPressHandler={CoffeCardAddToCart} />
            </TouchableOpacity>
          )}
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

        {/* Beans Flatlist */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.FlatListContainer, {marginBottom: tabBarHeight}]}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.push('Details', {index: item.index, id: item.id, type: item.type})}>
              <CoffeeCard {...item} buttonPressHandler={CoffeCardAddToCart} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_60,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_130,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default HomeScreen;
