import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator, RefreshControl } from "react-native";
import useGETAPI from "./CustomHooks/useGetAPI";

const SurahList = () => {
  const { data, loading, fetchData } = useGETAPI("https://api.alquran.cloud/v1/surah");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [surahs, setSurahs] = useState([]);

  // Pull-to-Refresh Function
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();  // Re-fetch data
    setRefreshing(false);
  };

  // Infinite Scroll Function
  const loadMoreData = () => {
    if (data.length >= 114) return; // Stop when all Surahs are loaded
    setPage(page + 1);
    setSurahs([...surahs, ...data.slice(0, 10)]); // Simulate pagination
  };

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={surahs.length > 0 ? surahs : data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>{item.number}</Text>
              <Text style={styles.text2}>{item.englishName}</Text>
            </View>
          )}
          keyExtractor={(item) => item.number.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["green"]} />
          }
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5} // Load more when 50% of the list is visible
          ListFooterComponent={() => (data.length >= 114 ? null : <ActivityIndicator size="small" color="green" />)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgreen",
    padding: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    marginRight: 20,
    fontWeight: "bold",
  },
  text2: {
    flex: 1,
    fontSize :18,
  },
});

export default SurahList;