import { StyleSheet, Text, View, Image, ImageProps } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface OrderItemCardProps {
  type: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  ItemPrice: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  ItemPrice,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.cardLinearGradient}
    >
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardImageInfoContainer}>
          <Image source={imagelink_square} style={styles.image} />
          <View>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubtitle}>{special_ingredient}</Text>
          </View>
        </View>
        <Text style={styles.cardCurrency}>
          $<Text style={styles.cardPrice}> {ItemPrice}</Text>
        </Text>
      </View>
      {prices.map((data: any, index: any) => (
        <View key={index.toString()} style={styles.cardTableRow}>
          <View style={styles.sizeBoxLeft}>
            <Text
              style={[
                styles.sizeText,
                { fontSize: type === 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16 },
              ]}
            >
              {data.size}
            </Text>
          </View>
          <View style={styles.priceBoxRight}>
            <Text style={styles.priceCurrency}>
              {data.currency}<Text style={styles.price}> {data.price}</Text>
            </Text>
          </View>
          <Text style={styles.cardQuantityPriceText}>
            x<Text style={styles.price}> {data.quantity}</Text>
          </Text>
          <Text style={styles.cardQuantityPriceText}>
            ${' '}{(data.quantity * data.price).toFixed(2)}
          </Text>
        </View>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardLinearGradient: {
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    marginBottom: SPACING.space_20,
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_15,
  },
  cardImageInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: BORDERRADIUS.radius_15,
    marginRight: SPACING.space_15,
  },
  cardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  cardSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  cardCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
  },
  cardTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_10,
  },
  sizeBoxLeft: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.space_10,
    marginRight: 1,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  priceBoxRight: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    borderTopRightRadius: BORDERRADIUS.radius_10,
    borderBottomRightRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.space_10,
    marginLeft: 1,
  },
  priceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryWhiteHex,
  },
  cardQuantityPriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
});

export default OrderItemCard;
