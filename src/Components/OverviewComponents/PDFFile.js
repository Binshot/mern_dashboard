import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PDFFile = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text fixed>
        <h2>Residents</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Birthday</th>
                <th>Address</th>
                <th>Occupation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sample Name</td>
                <td>Sample Age</td>
                <td>Sample Birthday</td>
                <td>Sample Address</td>
                <td>Sample Occupation</td>
              </tr>
            </tbody>
          </table>
        </Text>
      </Page>
    </Document>
  );
};

export default PDFFile;