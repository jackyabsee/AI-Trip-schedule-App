import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

interface HeroProps {
  title: string;
  subtitle?: string;
  image: any;
}

export default function Hero({ title, subtitle, image }: HeroProps) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18 },
  image: { height: 260, justifyContent: 'flex-end' },
  imageRadius: { borderRadius: 16 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.24)', borderRadius: 16 },
  content: { padding: 18 },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  subtitle: { color: '#F3F4F6', marginTop: 6 },
});
