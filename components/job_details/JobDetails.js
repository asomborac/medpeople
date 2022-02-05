import { Text, View, ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { styles } from './JobDetailsStyles';
import { Icon } from 'react-native-eva-icons';
import MapView from 'react-native-maps';
import { useState } from 'react/cjs/react.development';

export default function JobList({ route, navigation }) {

    const isOdd = function (x) { return x & 1; };
    const [scrollView, setScrollView] = useState(null);
    const data = route.params.data;

    return <ScrollView showsVerticalScrollIndicator={false} ref={view => setScrollView(view)}>
        <View>
            <ImageBackground source={{ uri: data.background_image }} style={styles.header}>
                <View style={styles.child}></View>
            </ImageBackground>

            <View style={styles.headerTopRow}>
                <TouchableHighlight underlayColor='none' onPress={() => navigation.navigate('List')} >
                    <Icon name='chevron-left-outline' fill='white' width={80} height={80} />
                </TouchableHighlight>
                <View style={styles.headerIcons}>
                    <Icon name='share-outline' fill='white' width={40} height={40} style={styles.headerIconMargin} />
                    <Icon name='map-outline' fill='white' width={40} height={40} style={styles.headerIconMargin}
                        onPress={() => { if (scrollView) scrollView.scrollTo({ x: 0, y: 800, animated: true }) }}
                    />
                    <TouchableHighlight underlayColor='none'>
                        <View style={styles.shiftsButton}>
                            <Text style={styles.shiftsButtonText} onPress={() => {
                                if (scrollView) scrollView.scrollTo({ x: 0, y: 260, animated: true })
                            }}>VIEW SHIFTS</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.employerContainer}>
                <ImageBackground source={{ uri: data.logo }} style={styles.avatar} imageStyle={{ borderRadius: 50 }} />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleEmployer}>{data.employer_name}</Text>
                    <View style={styles.titleLocationContainer}>
                        <Text style={styles.departmentText}>{data.department} in</Text>
                        <Text style={styles.locationText}>{data.address.city}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.iconsContainer}>
                <View>
                    <View style={styles.iconSection}>
                        <Icon name='calendar-outline' fill='black' width={30} height={30} />
                        <Text style={styles.iconSectionText}>{data.available_shifts.length} shifts</Text>
                    </View>
                    <View style={styles.iconSection}>
                        <Icon name='briefcase-outline' fill='black' width={30} height={30} />
                        <Text style={styles.iconSectionText}>{data.department}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.iconSection}>
                        <Icon name='star-outline' fill='black' width={30} height={30} />
                        <Text style={styles.iconSectionText}>{data.average_rating} stars</Text>
                    </View>
                    <View style={styles.iconSection}>
                        <Icon name='home-outline' fill='black' width={30} height={30} />
                        <Text style={styles.iconSectionText}>{data.distance_in_km} km</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.taskTitle}>Tasks</Text>
            <Text style={styles.tasks}>{data.tasks}</Text>
            <Text style={styles.taskTitle}>Qualifications</Text>
            <Text style={styles.tasks}>{data.qualifications}</Text>
            <Text style={styles.taskTitle}>Salary and working hours</Text>
            <Text style={styles.tasks}>The hourly rate may vary if the need is urgent or falls on red days.</Text>

            <View style={styles.shiftContainer}>
                {data.available_shifts.map((item, i) => {
                    let hour = Number(data.available_shifts[i].time.substring(0, 2));
                    return <View key={i}>
                        <View style={isOdd(i) ? styles.timeContainerOdd : styles.timeContainer}>
                            <View style={styles.timeFlex}>
                                <Icon
                                    name={hour >= 21 ? 'moon-outline' : 'sun-outline'}
                                    fill='black'
                                    width={30}
                                    height={30}
                                    style={styles.iconTime}
                                />
                                <View>
                                    <Text style={styles.timeText}>{data.available_shifts[i].time}</Text>
                                    <Text style={styles.dateText}>{data.available_shifts[i].date}</Text>
                                </View>
                            </View>
                            <Text style={styles.shiftPerHour}>{data.available_shifts[i].hourly_pay_in_eur} €/h - {Math.round(data.available_shifts[i].hourly_pay_in_eur * data.available_shifts[i].number_of_hours * 21.62)} €/mo</Text>
                        </View>
                    </View>
                })}
            </View>

            <Text style={styles.taskTitle}>About {data.employer_name}</Text>
            <Text style={styles.tasks}>{data.employer_description}</Text>

            <MapView style={styles.map}
                initialRegion={{
                    latitude: data.address.latitude,
                    longitude: data.address.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: data.address.latitude,
                        longitude: data.address.longitude,
                    }}
                    title={data.employer_name}
                    description={data.department}
                />
            </MapView>

            <Text style={styles.tasks}>{data.address.street}</Text>
            <Text style={styles.city}>{data.address.postal_code} {data.address.city}</Text>

        </View>
    </ScrollView>
};