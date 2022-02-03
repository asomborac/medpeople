import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        height: 300,
        width: '100%',
        paddingTop: 50,
    },
    child: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: -50
    },
    headerTopRow: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: -240
    },
    headerIcons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 220,
        marginRight: 10
    },
    shiftsButton: {
        backgroundColor: '#FF4F70',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 22
    },
    shiftsButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 14
    },
    employerContainer: {
        flexDirection: 'row',
        marginTop: 40,
        marginHorizontal: 20
    },
    avatar: {
        resizeMode: 'cover',
        justifyContent: 'center',
        height: 70,
        width: 70,
    },
    titleContainer: {
        marginHorizontal: 20,
        marginTop: 4
    },
    titleEmployer: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    titleLocationContainer: {
        flexDirection: 'row'
    },
    departmentText: {
        fontSize: 20,
        color: 'white',
    },
    locationText: {
        fontSize: 20,
        color: '#e8e8e8',
        marginLeft: 5
    },
    iconsContainer: {
        marginTop: 70,
        marginHorizontal: 60,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    iconSection: {
        flexDirection: 'row',
        marginTop: 15
    },
    iconSectionText: {
        fontSize: 18,
        marginLeft: 5,
        marginTop: 2,
        fontWeight: 'bold'
    },
    taskTitle: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 20
    },
    tasks: {
        fontSize: 14,
        marginHorizontal: 20,
        marginTop: 10
    },
    shiftContainer: {
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 10
    },
    timeContainer: {
        flexDirection: "row",
        backgroundColor: '#f9f9f9',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(0,0,0, .06)',
        justifyContent: 'space-between',
    },
    timeContainerOdd: {
        flexDirection: "row",
        backgroundColor: '#ededed',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(0,0,0, .03)',
        justifyContent: 'space-between'
    },
    timeText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
        letterSpacing: 1.2,
    },
    timeFlex: {
        flexDirection: "row"
    },
    shiftPerHour: {
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 7,
    },
    dateText: {
        fontSize: 12,
        marginLeft: 5,
        letterSpacing: 1.2,
        color: 'rgb(90,90,90)'
    },
    iconTime: {
        marginTop: 2
    },
    city: {
        fontSize: 14,
        marginHorizontal: 20,
        marginBottom: 10
    },
    map: {
        marginHorizontal: 20,
        marginTop: 10,
        height: 300,
    },
    headerIconMargin: {
        marginTop: 20
    }
});