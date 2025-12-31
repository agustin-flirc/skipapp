import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const paths = [
  "M0.013,18.889C0.259,14.435 1.964,10.368 4.659,7.159L6.815,9.317C4.667,11.966 3.3,15.275 3.067,18.89L0.013,18.889Z",
  "M6.75,5.014C9.931,2.204 14.012,0.39 18.502,0.062L18.502,3.089C14.846,3.41 11.522,4.893 8.899,7.165L6.75,5.014Z",
  "M21.498,0.065C25.985,0.403 30.061,2.225 33.236,5.041L31.11,7.166C28.486,4.892 25.157,3.409 21.498,3.089L21.498,0.065Z",
  "M35.323,7.189C38.005,10.397 39.701,14.457 39.943,18.901L36.941,18.9C36.71,15.282 35.343,11.97 33.193,9.319L35.323,7.189Z",
  "M39.884,21.896C39.477,26.227 37.685,30.158 34.957,33.242L32.827,31.11C35.021,28.582 36.48,25.399 36.871,21.895L39.884,21.896Z",
  "M32.811,35.332C29.701,37.939 25.787,39.618 21.498,39.941L21.498,36.904C24.957,36.601 28.12,35.259 30.673,33.192L32.811,35.332Z",
  "M18.502,39.944C14.203,39.63 10.28,37.954 7.162,35.347L9.325,33.184C11.877,35.254 15.041,36.599 18.502,36.903L18.502,39.944Z",
  "M5.013,33.259C2.275,30.17 0.476,26.228 0.07,21.884L3.135,21.885C3.524,25.388 4.981,28.571 7.172,31.101L5.013,33.259Z"
]

const SVGTest = () => {
  const [svgHovered, setSvgHovered] = useState(false);
  const svgFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (svgHovered) {
      Animated.timing(svgFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(svgFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [svgHovered, svgFadeAnim]);

  const generateRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
      '#FAD7A0', '#ABEBC6', '#F9E79F', '#D5A6BD', '#A9CCE3'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const generateRandomPosition = () => {
    return {
      left: Math.random() * (width - 100), // 100 is the width of the element
      top: Math.random() * height,
    };
  };

  const staticSvgs = useMemo(() => {
    const svgArray = [];
    for (let i = 0; i < 80; i++) {
      const position = generateRandomPosition();
      const color = generateRandomColor();
      svgArray.push({
        id: i,
        position,
        color,
      });
    }
    return svgArray;
  }, []);

  const renderSvg = (svgData) => {
    const { color } = svgData;

    return (
      <Svg
        key={svgData.id}
        width={100}
        height={100}
      >
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path}
            fill={color}
          />
        ))}
      </Svg>
    );
  };

  const handleSvgHoverIn = () => {
    setSvgHovered(true);
  };

  const handleSvgHoverOut = () => {
    setSvgHovered(false);
  };

  return (
    <View style={styles.container}>
      {staticSvgs.map((svgData) => (
        <Animated.View key={svgData.id+'_svg'} style={[styles.svgElement, {left: svgData.position.left, top: svgData.position.top, opacity: svgFadeAnim}]}>
          {renderSvg(svgData)}
        </Animated.View>
      ))}
      <TouchableOpacity
        style={styles.square}
        onMouseEnter={handleSvgHoverIn}
        onMouseLeave={handleSvgHoverOut}
      >
        <Text style={styles.squareText}>Hover me!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgElement: {
    position: 'absolute',
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#ff4444',
  },
  squareText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SVGTest;
