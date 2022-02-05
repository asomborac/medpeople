import { Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { styles } from './JobListStyles';
import PropTypes from 'prop-types';

export default function HorizontalList({ e, el, item, filteredFavorites, handleFavorites, navigation, type }) {

    // Calculation for shifts
    let shifts = [];
    el.available_shifts.forEach(shift => shifts.push(shift.hourly_pay_in_eur * shift.number_of_hours))

    let bestShift = Math.max(...shifts);
    let numberOfShifts = el.available_shifts.length;

    // Empty arrays for mapping stars (rating) of the hospital
    let rating = el.average_rating;
    let starsFull = [];
    let starsEmpty = [];

    for (let j = 0; j < rating; j += 1) starsFull.push(null);
    for (let j = 0; j < 5 - rating; j += 1) starsEmpty.push(null);

    const renderList = <TouchableHighlight key={e} onPress={() => navigation.navigate('Details', { data: el, filteredFavorites })} underlayColor='none'>
        <View style={styles.employerContainer} >
            <ImageBackground source={{ uri: el.background_image }} style={styles.image} imageStyle={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }}   >
                <View style={styles.headerContainer}>
                    <ImageBackground source={{ uri: el.logo }} style={styles.avatar} imageStyle={{ borderRadius: 50 }} />
                    <TouchableHighlight onPress={() => handleFavorites(el.id)} underlayColor='none'>
                        <Icon name={filteredFavorites.includes(el.id) ? 'heart' : 'heart-outline'} fill='white' width={48} height={48} />
                    </TouchableHighlight>
                </View>
            </ImageBackground>
            <View style={styles.employerContent}>
                <Text style={styles.employerName}>{el.employer_name}</Text>
            </View>
            <View style={styles.departmentContainer}>
                <Text style={styles.department}>{el.department}</Text>
            </View>
            <View style={styles.shiftsContainer}>
                <Text style={styles.shiftsText}>Up to {bestShift}€ per shift</Text>
                <Text style={styles.shiftsText}>{numberOfShifts} shifts</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.locationText}>{el.address.city}</Text>
                <View style={styles.starContainer}>
                    {starsFull.map((star, key) => <Icon key={key} name='star' fill='#FF4F70' width={20} height={20} />)}
                    {starsEmpty.map((star, key) => <Icon key={numberOfShifts + key} name='star-outline' fill='#FF4F70' width={20} height={20} />)}
                </View>
            </View>
        </View>
    </TouchableHighlight>

    // Rendering filtered horizontal lists for every campaign, except favorites 
    if (type === 'dynamic') {
        if (el.campaigns.includes(item)) return renderList;
        else return <View />
    }

    // Rendering filtered horizontal list for favorites
    else if (type === 'favorites') {
        if (filteredFavorites.includes(el.id)) return renderList;
        else return <View />
    }
};

HorizontalList.propTypes = {
    e: PropTypes.number.isRequired,
    el: PropTypes.object.isRequired,
    item: PropTypes.string.isRequired,
    filteredFavorites: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleFavorites: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

HorizontalList.defaultProps = {
    type: 'dynamic'
};