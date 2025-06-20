import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  imageHeight?: number;
  imageWidth?: number;
  imageContainerWidth?: number;
  onImageChange?: (index: number) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
  showDots = true,
  imageHeight = 150,
  imageWidth = width - 30,
  imageContainerWidth = width,
  onImageChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Auto play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay) {
      interval = setInterval(() => {
        if (activeIndex === images.length - 1) {
          scrollToImage(0);
        } else {
          scrollToImage(activeIndex + 1);
        }
      }, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeIndex, autoPlay, autoPlayInterval, images.length]);

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      if (index !== activeIndex) {
        setActiveIndex(index);
        if (onImageChange) {
          onImageChange(index);
        }
      }
    });

    return () => {
      scrollX.removeListener(handleScroll);
    };
  }, [activeIndex, onImageChange, scrollX]);

  const scrollToImage = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        animated: true,
      });
    }
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity key={index} onPress={() => scrollToImage(index)}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        {images.map((image, index) => (
          <View
            key={`image-${index}`}
            style={[styles.imageContainer, {width: imageContainerWidth}]}>
            <Image
              source={{uri: image}}
              style={[styles.image, {width: imageWidth, height: imageHeight}]}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {showDots && renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: width - 30,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
  },
});
