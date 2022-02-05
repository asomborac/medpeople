import { Text, View, ScrollView, SafeAreaView, ImageBackground, TouchableHighlight, Modal, Button } from 'react-native';
import * as React from 'react';
import jobs from './../../jobs.json';
import { Icon } from 'react-native-eva-icons';
import { styles } from './JobListStyles';
import { useState, useEffect } from 'react/cjs/react.development';
import DropDownPicker from 'react-native-dropdown-picker';

export default function JobList({ navigation }) {

    const data = jobs.jobs;

    const [scrollView, setScrollView] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const [filtersVisible, setFiltersVisible] = useState(false);
    const [filterRating, setFilterRating] = useState(0);

    const [locationOpen, setLocationOpen] = useState(false);
    const [location, setLocation] = useState([]);
    const [locations, setLocations] = useState([]);

    const [departmentOpen, setDepartmentOpen] = useState(false);
    const [department, setDepartment] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // Creating dropdown options from the json file
        let loc = [...new Set(data.map(item => item.address.city))];
        loc = loc.map((item, i) => { return { label: item, value: i } })
        setLocations(loc);

        let dep = [...new Set(data.map(item => item.department))];
        dep = dep.map((item, i) => { return { label: item, value: i } })
        setDepartments(dep);
    }, []);

    const handleFavorites = (id) => {
        if (favorites.includes(id)) setFavorites(favorites.filter(fav => fav !== id));
        else setFavorites(prevState => [...prevState, id]);
    };

    const campaigns = [
        'Urgent vacancies',
        'Weekend shifts',
        'Recently added',
        'Best paid shifts',
    ];

    let filterStarsFull = [];
    let filterStarsEmpty = [];

    for (let j = 0; j < filterRating; j += 1) filterStarsFull.push(null);
    for (let j = 0; j < 5 - filterRating; j += 1) filterStarsEmpty.push(null);

    let filtered = data;

    if (filterRating > 0) filtered = data.filter(item => item.average_rating >= filterRating);

    if (location.length > 0) {
        filtered = filtered.filter(item => {

            let tempLocations = [];
            let tempLocationsStrings = [];

            location.forEach(item => tempLocations.push(locations.filter(el => el.value === item)));
            tempLocations.forEach(item => tempLocationsStrings.push(item[0].label));

            if (tempLocationsStrings.includes(item.address.city)) return item
        })
    }

    if (department.length > 0) {
        filtered = filtered.filter(item => {

            let tempDepartments = [];
            let tempDepartmentsStrings = [];

            department.forEach(item => tempDepartments.push(departments.filter(el => el.value === item)));
            tempDepartments.forEach(item => tempDepartmentsStrings.push(item[0].label));

            if (tempDepartmentsStrings.includes(item.department)) return item
        })
    }

    console.log(filtered.length)

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
                    if (item === 'Weekend shifts') icon = <Icon name='calendar-outline' fill='white' width={24} height={24} />
                    else if (item === 'Best paid shifts') icon = <Icon name='checkmark-circle-outline' fill='white' width={24} height={24} />
                    else if (item === 'Urgent vacancies') icon = <Icon name='alert-triangle-outline' fill='white' width={24} height={24} />
                    else if (item === 'Recently added') icon = <Icon name='clock-outline' fill='white' width={24} height={24} />

                    return <View key={i}>
                        <View style={styles.campaign}>
                            <View style={styles.campaignIcon}>
                                {icon}
                            </View>
                            <Text style={styles.campaignTitle}>{item}</Text>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.employerScrollView}>
                            {filtered.map((el, e) => {

                                let shifts = [];
                                el.available_shifts.forEach(shift => shifts.push(shift.hourly_pay_in_eur * shift.number_of_hours))

                                let bestShift = Math.max(...shifts);
                                let numberOfShifts = el.available_shifts.length;

                                let rating = el.average_rating;
                                let starsFull = [];
                                let starsEmpty = [];

                                for (let j = 0; j < rating; j += 1) starsFull.push(null);
                                for (let j = 0; j < 5 - rating; j += 1) starsEmpty.push(null);

                                if (el.campaigns.includes(item)) {

                                    return <TouchableHighlight key={e} onPress={() => navigation.navigate('Details', { filtered: el, favorites })} underlayColor='none'>
                                        <View style={styles.employerContainer} >
                                            <ImageBackground source={{ uri: el.background_image }} style={styles.image} imageStyle={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }}   >
                                                <View style={styles.headerContainer}>
                                                    <ImageBackground source={{ uri: el.logo }} style={styles.avatar} imageStyle={{ borderRadius: 50 }} />
                                                    <TouchableHighlight onPress={() => handleFavorites(el.id)} underlayColor='none'>
                                                        <Icon name={favorites.includes(el.id) ? 'heart' : 'heart-outline'} fill='white' width={48} height={48} />
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
                                }
                            })}

                            <View style={styles.employerLast} />
                        </ScrollView>
                    </View>
                }
            })}

            {favorites.length > 0 && <View>
                <View style={styles.campaign}>
                    <View style={styles.campaignIcon}>
                        <Icon name='heart-outline' fill='white' width={24} height={24} />
                    </View>
                    <Text style={styles.campaignTitle}>Favorites</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.employerScrollView}>
                    {filtered.map((el, e) => {

                        if (favorites.includes(el.id)) {

                            let shifts = [];
                            el.available_shifts.forEach(shift => shifts.push(shift.hourly_pay_in_eur * shift.number_of_hours))

                            let bestShift = Math.max(...shifts);
                            let numberOfShifts = el.available_shifts.length;

                            let rating = el.average_rating;
                            let starsFull = [];
                            let starsEmpty = [];

                            for (let j = 0; j < rating; j += 1)  starsFull.push(null);
                            for (let j = 0; j < 5 - rating; j += 1)  starsEmpty.push(null);

                            return <TouchableHighlight key={e} onPress={() => navigation.navigate('Details', { filtered: el, favorites })} underlayColor='none'>
                                <View style={styles.employerContainer} >
                                    <ImageBackground source={{ uri: el.background_image }} style={styles.image} imageStyle={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }}   >
                                        <View style={styles.headerContainer}>
                                            <ImageBackground source={{ uri: el.logo }} style={styles.avatar} imageStyle={{ borderRadius: 50 }} />
                                            <TouchableHighlight onPress={() => handleFavorites(el.id)} underlayColor='none'>
                                                <Icon name={favorites.includes(el.id) ? 'heart' : 'heart-outline'} fill='white' width={48} height={48} />
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
                        }
                    })}
                    <View style={styles.employerLast} />
                </ScrollView>
            </View>
            }
        </ScrollView>
        <View style={styles.endPadding} />
        <View style={styles.footer}>
            <TouchableHighlight onPress={() => scrollView.scrollTo({ x: 0, y: 0, animated: true })} underlayColor='none' style={styles.footerIcon}>
                <Icon name='alert-triangle-outline' fill='white' width={24} height={24} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => scrollView.scrollTo({ x: 0, y: 390, animated: true })} underlayColor='none' style={styles.footerIcon}>
                <Icon name='calendar-outline' fill='white' width={24} height={24} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => scrollView.scrollTo({ x: 0, y: 780, animated: true })} underlayColor='none' style={styles.footerIcon}>
                <Icon name='clock-outline' fill='white' width={24} height={24} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => scrollView.scrollTo({ x: 0, y: 1170, animated: true })} underlayColor='none' style={styles.footerIcon}>
                <Icon name='checkmark-circle-outline' fill='white' width={24} height={24} />
            </TouchableHighlight>
            {favorites.length > 0 ?
                <TouchableHighlight onPress={() => scrollView.scrollTo({ x: 0, y: 1560, animated: true })} underlayColor='none' style={styles.footerIcon} disabled={false}>
                    <Icon name='heart-outline' fill='white' width={24} height={24} />
                </TouchableHighlight>
                :
                <TouchableHighlight underlayColor='none' style={styles.footerIconDisabled} disabled={true}>
                    <Icon name='heart-outline' fill='white' width={24} height={24} />
                </TouchableHighlight>
            }
            <TouchableHighlight onPress={() => setFiltersVisible(!filtersVisible)} underlayColor='none' style={styles.searchIcon}>
                <Icon name='funnel-outline' fill='#FF4F70' width={24} height={24} />
            </TouchableHighlight>
        </View>

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
                        open={departmentOpen}
                        value={department}
                        items={departments}
                        setOpen={setDepartmentOpen}
                        setValue={setDepartment}
                        setItems={setDepartments}
                        multiple={true}
                        min={0}
                        max={3}
                        style={styles.dropdown}
                        labelStyle={styles.dropdownLabel}
                        stickyHeader={true}
                        containerStyle={{ width: 240 }}
                    />
                    <Text style={styles.filterTitle}>Locations</Text>
                    <DropDownPicker
                        open={locationOpen}
                        value={location}
                        items={locations}
                        setOpen={setLocationOpen}
                        setValue={setLocation}
                        setItems={setLocations}
                        multiple={true}
                        min={0}
                        max={2}
                        style={styles.dropdown}
                        labelStyle={styles.dropdownLabel}
                        stickyHeader={true}
                        containerStyle={{ width: 240 }}
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