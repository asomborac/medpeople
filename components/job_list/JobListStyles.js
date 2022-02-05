import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#fafafa"
    },
    bottomShadow: {
        overflow: 'hidden',
        paddingBottom: 5
    },
    titleContainer: {
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        padding: 15
    },
    text: {
        fontSize: 46
    },
    page: {
        marginTop: -5
    },
    campaign: {
        flexDirection: "row",
    },
    campaignIcon: {
        height: 35,
        width: 35,
        borderRadius: 60,
        backgroundColor: '#FF4F70',
        marginTop: 15,
        marginLeft: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    campaignTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 17,
        marginLeft: 15
    },
    employerScrollView: {
        paddingLeft: 10,
        height: 340,
    },
    employerContainer: {
        backgroundColor: 'white',
        marginLeft: 30,
        marginTop: 20,
        height: 300,
        width: 300,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 10,
    },
    employerLast: {
        marginRight: 40
    },
    image: {
        resizeMode: 'cover',
        justifyContent: 'center',
        height: 80,
        width: 300,
    },
    headerContainer: {
        flexDirection: "row",
        margin: 20,
        justifyContent: 'space-between'
    },
    avatar: {
        resizeMode: 'cover',
        justifyContent: 'center',
        height: 40,
        width: 40,
    },
    employerContent: {
        margin: 20
    },
    employerName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    departmentContainer: {
        backgroundColor: '#FF4F70',
        borderRadius: 5,
        padding: 5,
        marginLeft: 20,
        marginTop: -10,
        alignSelf: 'flex-start'
    },
    department: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 5
    },
    endPadding: {
        marginBottom: 60
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    shiftsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 30
    },
    shiftsText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 50
    },
    locationText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    starContainer: {
        flexDirection: "row",
    },
    footer: {
        height: 60,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ededed',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    footerFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footerIcon: {
        height: 36,
        width: 36,
        borderRadius: 60,
        backgroundColor: '#FF4F70',
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        height: 36,
        width: 36,
        borderRadius: 60,
        backgroundColor: '#FEF5F1',
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerIconDisabled: {
        height: 36,
        width: 36,
        borderRadius: 60,
        backgroundColor: '#FF9FB1',
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: "#fff",
        width: 350,
        height: 420,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginHorizontal: 20,
        marginVertical: 10
    },
    dropdown: {
        zIndex: 2000
    },
    dropdownLabel: {
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 30
    },
    buttonHighlight: {
        width: 100,
        height: 40,
        marginHorizontal: 0
    },
    modalButton: {
        width: 70,
        height: 30,
        backgroundColor: '#FF4F70',
        borderRadius: 6,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center'
    }
});