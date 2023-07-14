"use strict";

import React from "react";
import { Button, Text, View, SectionList, StyleSheet } from "react-native";
import EventItem from "./EventItem";

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  async _onRefresh() {
    this.setState({ isLoading: true });
    await this.props.reload();
  }

  getItemIndexForHour(sections, hour) {
    let i = 0;
    let j = 0;
    for (i = 0; i < sections.length; i++) {
      let sectionData = sections[i].data;
      for (j = 0; j < sectionData.length; j++) {
        let startDate = new Date(sectionData[j].start);
        if (startDate >= hour) {
          return [i, j];
        }
      }
    }

    return [i - 1, j - 1];
  }

  scrollToNow = () => {
    let currentHour = new Date();
    // currentHour.setMinutes(0, 0, 0);

    const { sections } = this.props;
    let indices = this.getItemIndexForHour(sections, currentHour);

    let pos = this.sectionListRef.props.stickySectionHeadersEnabled ? 1 : 0;
    this.sectionListRef.scrollToLocation({
      sectionIndex: indices[0],
      itemIndex: indices[1] - pos,
      viewPosition: 0,
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => this.scrollToNow()} title="Now" />
      ),
    });
  }

  render() {
    // console.log("render");
    let sections = this.props.sections;
    if (!sections) {
      sections = [];
    }

    return (
      <SectionList
        renderItem={({ item }) => (
          <EventItem item={item} navigation={this.props.navigation} />
        )}
        renderSectionHeader={this.renderSectionHeader}
        SectionSeparatorComponent={Separator}
        sections={sections}
        keyExtractor={(item, index) => item + index}
        initialNumToRender={200}
        onRefresh={() => this._onRefresh()}
        refreshing={this.props.isLoading}
        style={{ backgroundColor: "#fff" }}
        ref={(ref) => (this.sectionListRef = ref)}
      />
    );
  }

  renderSectionHeader({ section: { title } }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>{title.toUpperCase()}</Text>
      </View>
    );
  }
}

export default EventList;

const Separator = () => <View style={styles.sectionSeparator} />;

const styles = StyleSheet.create({
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
