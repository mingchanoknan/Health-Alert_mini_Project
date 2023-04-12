import { Spinner } from "@ui-kitten/components";
import { StyleSheet, Text, View, Image, FlatList, Button, TouchableOpacity } from "react-native";
const Loading = () => {
    return (
        <View style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems:"center" }}>
            <Spinner size="medium" status="control"/>
        </View>
    )
}

export default Loading