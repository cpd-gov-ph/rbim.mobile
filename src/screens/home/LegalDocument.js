import React from "react";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux"; // Retrieving the state from the Redux store
import { WebView } from "react-native-webview"; // To display web content
import { styles } from "../termsAndConditions/TermsAndConditions.styles"; // Terms And Conditions styles
import Loader from "../../utils/Loader"; // Custom loader
import { addhtml_content } from "../../utils/helpers"; // Helper functions
import moment from "moment"; // For formatting date and time
import { Fonts } from "../../fontfamily"; // Typography
import LegalDocHeader from "../../components/header/LegalDocHeader"; // Custom header component

const LegalDocument = () => {
  const legal_doc_loader = useSelector(
    // profile view api progress loader
    (state) => state?.profileReducer?.legal_doc_loading
  );
  const legal_data = useSelector(
    (state) => state?.profileReducer?.legal_doc_data
  );
  console.log("legal_data", legal_data);
  return (
    <SafeAreaView style={styles().container}>
      <Loader loading={legal_doc_loader} />
      <LegalDocHeader
        updated_at={moment(legal_data.term_and_conditions.updated_at).format(
          "DD/MM/YYYY"
        )}
        title={legal_data.term_and_conditions.title}
      />
      <WebView
        hasZoom={false}
        source={{
          html: addhtml_content(
            Fonts.Regular,
            "ttf",
            legal_data.term_and_conditions.meta_value
          ),
        }}
      />
    </SafeAreaView>
  );
};

export default LegalDocument;
