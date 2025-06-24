"use strict";

import React, { useEffect, useRef, useCallback } from "react";
import { Button, Text, View, SectionList, StyleSheet } from "react-native";
import EventItem from "./EventItem";

const EventList = ({ sections = [], isLoading, reload, navigation }) => {
  const sectionListRef = useRef(null);

  const getItemIndexForHour = useCallback((sections, hour) => {
    let i = 0;
    let j = 0;
    for (i = 0; i < sections.length; i++) {
      const sectionData = sections[i].data;
      for (j = 0; j < sectionData.length; j++) {
        const startDate = new Date(sectionData[j].start);
        if (startDate >= hour) {
          return [i, j];
        }
      }
    }
    return [i - 1, j - 1];
  }, []);

  const scrollToNow = useCallback(() => {
    const currentHour = new Date();
    const indices = getItemIndexForHour(sections, currentHour);
    
    if (sectionListRef.current) {
      const pos = sectionListRef.current.props.stickySectionHeadersEnabled ? 1 : 0;
      sectionListRef.current.scrollToLocation({
        sectionIndex: indices[0],
        itemIndex: indices[1] - pos,
        viewPosition: 0,
      });
    }
  }, [sections, getItemIndexForHour]);

  const handleRefresh = useCallback(async () => {
    await reload();
  }, [reload]);

  const renderItem = useCallback(({ item }) => (
    <EventItem item={item} navigation={navigation} />
  ), [navigation]);

  const renderSectionHeader = useCallback(({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderTitle}>{title.toUpperCase()}</Text>
    </View>
  ), []);

  const keyExtractor = useCallback((item, index) => `${item.id || item.title}-${index}`, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={scrollToNow} title="Now" />
      ),
    });
  }, [navigation, scrollToNow]);

  return (
    <SectionList
      ref={sectionListRef}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      SectionSeparatorComponent={Separator}
      sections={sections}
      keyExtractor={keyExtractor}
      initialNumToRender={200}
      onRefresh={handleRefresh}
      refreshing={isLoading}
      style={styles.container}
    />
  );
};

export default EventList;

const Separator = () => <View style={styles.sectionSeparator} />;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  sectionHeader: {
    backgroundColor: "#f6f6f6",
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#404040",
    paddingTop: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 6,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: "#d7d7d7",
  },
});
