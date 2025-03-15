import React, { useRef, useState } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import useGetArabic from "./CustomHooks/useGetArabic";

const Recitation = () => {
    const { data, loading } = useGetArabic('http://api.alquran.cloud/v1/surah/1');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); // Track play state
    const flatListRef = useRef(null);
    const timerRef = useRef(null);

    const handleItemPress = (index) => {
        setSelectedIndex(index);
        flatListRef.current?.scrollToIndex({ index, animated: true });
    };

    const handlePlayButton = () => {
        if (isPlaying) {
            // Stop and reset to original state
            clearInterval(timerRef.current);
            setIsPlaying(false);
            setSelectedIndex(null);
        } else {
            // Start moving to the next item every 3 seconds
            setIsPlaying(true);
            timerRef.current = setInterval(() => {
                setSelectedIndex((prevIndex) => {
                    if (prevIndex === null || prevIndex + 1 >= data.length) {
                        clearInterval(timerRef.current);
                        setIsPlaying(false);
                        return null;
                    }
                    flatListRef.current?.scrollToIndex({ index: prevIndex + 1, animated: true });
                    return prevIndex + 1;
                });
            }, 2000);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="blue" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => handleItemPress(index)}
                        style={[styles.container, selectedIndex === index && styles.selected]}
                    >
                        <View style={styles.inner}>
                            <Text style={styles.arabic}>Ayah Number: {item.number}</Text>
                        </View>
                        <View style={styles.inner}>
                            <Text style={styles.arabic1}>{item.text}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.number.toString()}
                extraData={selectedIndex}
            />

            {selectedIndex !== null && (
                <TouchableOpacity style={styles.playButton} onPress={handlePlayButton}>
                    <Text style={styles.play}>{isPlaying ? "Stop" : "Play Audio"}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 20,
        height: 80,
        margin: 20,
        backgroundColor: 'white',
    },
    selected: {
        backgroundColor: '#d1e7ff',
    },
    inner: {
        flex: 0.5,
        justifyContent: 'center',
    },
    arabic: {
        textAlign: 'center',
        color: 'black',
    },
    arabic1: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',
    },
    playButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
    },
    play: {
        fontSize: 20,
        color: 'white',
    }
});

export default Recitation;