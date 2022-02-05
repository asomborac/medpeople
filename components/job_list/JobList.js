import { Text, View, ScrollView, SafeAreaView, TouchableHighlight, Modal } from 'react-native';
import * as React from 'react';
import jobs from './../../jobs.json';
import { Icon } from 'react-native-eva-icons';
import { styles } from './JobListStyles';
import { useState, useEffect } from 'react/cjs/react.development';
import DropDownPicker from 'react-native-dropdown-picker';
import CampaignHeader from './CampaignHeader';
import HorizontalList from './HorizontalList';
import Footer from './Footer';

export default function JobList({ navigation }) {

    const data = jobs.jobs; // Json data

    const [scrollView, setScrollView] = useState(null); // Ref for the scrollTo function
    const [favorites, setFavorites] = useState([]);

    const [filtersVisible, setFiltersVisible] = useState(false);

    const [filterRating, setFilterRating] = useState(0); // Stars filter selected

    // Location dropdown
    const [locationOpen, setLocationOpen] = useState(false);
    const [location, setLocation] = useState([]);
    const [locations, setLocations] = useState([]);

    // Depratment dropdown
    const [departmentOpen, setDepartmentOpen] = useState(false);
    const [department, setDepartment] = useState([]);
    const [departments, setDepartments] = useState([]);

    // Creating dropdown options from the json file
    useEffect(() => {
        let loc = [...new Set(data.map(item => item.address.city))];
        loc = loc.map((item, i) => { return { label: item, value: i } })
        setLocations(loc);

        let dep = [...new Set(data.map(item => item.department))];
        dep = dep.map((item, i) => { return { label: item, value: i } })
        setDepartments(dep);
    }, []);

    // Handles the state array of selected favorites
    const handleFavorites = (id) => {
        if (favorites.includes(id)) setFavorites(favorites.filter(fav => fav !== id));
        else setFavorites(prevState => [...prevState, id]);
    };

    // Empty arrays for rendering stars for rating
    let filterStarsFull = [];
    let filterStarsEmpty = [];
    for (let j = 0; j < filterRating; j += 1) filterStarsFull.push(null);
    for (let j = 0; j < 5 - filterRating; j += 1) filterStarsEmpty.push(null);

    // Filtering data acquired from the json file 
    let filtered = data;
    if (filterRating > 0) filtered = data.filter(item => item.average_rating >= filterRating);

    if (location.length > 0) {
        filtered = filtered.filter(item => {
            let tempLocations = [], tempLocationsStrings = [];

            location.forEach(item => tempLocations.push(locations.filter(el => el.value === item)));
            tempLocations.forEach(item => tempLocationsStrings.push(item[0].label));

            if (tempLocationsStrings.includes(item.address.city)) return item;
        })
    };

    if (department.length > 0) {
        filtered = filtered.filter(item => {
            let tempDepartments = [], tempDepartmentsStrings = [];

            department.forEach(item => tempDepartments.push(departments.filter(el => el.value === item)));
            tempDepartments.forEach(item => tempDepartmentsStrings.push(item[0].label));

            if (tempDepartmentsStrings.includes(item.department)) return item;
        })
    };

    // Filtering the list of campaigns to show
    let campaigns = [];
    filtered.forEach(item => item.campaigns.forEach(el => campaigns.push(el)));
    campaigns = [...new Set(campaigns)];

    // Filtering the list of favorites
    let filteredIDs = filtered.map(item => item.id)
    let filteredFavorites = filteredIDs.filter(item => favorites.includes(item))

    return <SafeAreaView style={styles.container}>
        <View style={styles.bottomShadow}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Campaigns</Text>
            </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.page} ref={view => setScrollView(view)}>

            {campaigns.map((item, i) => {
                if (item) {
                    let icon = null;
                    if (item === 'Weekend shifts') icon = 'calendar-outline';
                    else if (item === 'Best paid shifts') icon = 'checkmark-circle-outline';
                    else if (item === 'Urgent vacancies') icon = 'alert-triangle-outline';
                    else if (item === 'Recently added') icon = 'clock-outline';

                    return <View key={i}>
                        <CampaignHeader icon={icon} title={item} />

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.employerScrollView}>
                            {filtered.map((el, e) => {
                                return <HorizontalList
                                    key={e} e={e} el={el} item={item}
                                    filteredFavorites={filteredFavorites}
                                    handleFavorites={handleFavorites}
                                    navigation={navigation}
                                    type='dynamic'
                                />
                            })}
                            <View style={styles.employerLast} />
                        </ScrollView>
                    </View>
                }
            })}

            {filteredFavorites.length > 0 && <View>
                <CampaignHeader icon='heart-outline' title='Favorites' />

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.employerScrollView}>
                    {filtered.map((el, e) => {
                        return <HorizontalList
                            key={e} e={e} el={el} item='Favorites'
                            filteredFavorites={filteredFavorites}
                            handleFavorites={handleFavorites}
                            navigation={navigation}
                            type='favorites'
                        />
                    })}
                    <View style={styles.employerLast} />
                </ScrollView>
            </View>}

            {filteredFavorites.length === 0 && campaigns.length === 0 && <CampaignHeader icon='close-circle-outline' title='No campaigns available' />}

        </ScrollView>

        <View style={styles.endPadding} />

        <Footer
            campaigns={campaigns}
            scrollView={scrollView}
            filteredFavorites={filteredFavorites}
            filtersVisible={filtersVisible}
            setFiltersVisible={setFiltersVisible}
        />

        <Modal
            presentationStyle="overFullScreen"
            transparent
            visible={filtersVisible}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.modal}>
                    <Text style={styles.filterTitle}>Minimal average rating</Text>
                    <View style={styles.starContainer}>
                        {filterStarsFull.map((star, key) => <Icon key={key} name='star' fill='#FF4F70' width={40} height={40} onPress={() => setFilterRating(key + 1)} />)}
                        {filterStarsEmpty.map((star, key) => <Icon key={filterRating + key} name='star-outline' fill='#FF4F70' width={40} height={40} onPress={() => setFilterRating(filterRating + key + 1)} />)}
                    </View>
                    <Text style={styles.filterTitle}>Departments</Text>
                    <DropDownPicker
                        open={departmentOpen} value={department} items={departments}
                        setOpen={setDepartmentOpen} setValue={setDepartment} setItems={setDepartments}
                        style={styles.dropdown} containerStyle={{ width: 240 }} labelStyle={styles.dropdownLabel}
                        multiple={true} min={0} max={3}
                        stickyHeader={true}
                    />
                    <Text style={styles.filterTitle}>Locations</Text>
                    <DropDownPicker
                        open={locationOpen} value={location} items={locations}
                        setOpen={setLocationOpen} setValue={setLocation} setItems={setLocations}
                        style={styles.dropdown} containerStyle={{ width: 240 }} labelStyle={styles.dropdownLabel}
                        multiple={true} min={0} max={2}
                        stickyHeader={true}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.buttonHighlight} underlayColor='none' onPress={() => {
                            setFilterRating(0);
                            setLocation([]);
                            setDepartment([]);
                        }}>
                            <View style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Reset</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttonHighlight} underlayColor='none' onPress={() => setFiltersVisible(!filtersVisible)}>
                            <View style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>

    </SafeAreaView>
};