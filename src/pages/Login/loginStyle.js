import { StyleSheet } from "react-native";


export const loginStyl = StyleSheet.create({
    container: {
        display: "flex",
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "rgb(101,37,131)"

    },
    view: {
        width: '80%',
        marginRight: '10%',
        marginLeft:'10%'
    },
    cardTitle: {
        color: "rgb(101,37,131)"
    },
    cardButton: {
        margin: 2,
        marginLeft: 0,
        marginRight: 0
    }
})