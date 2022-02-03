import { Text, View, ScrollView, SafeAreaView, ImageBackground, TouchableHighlight, Modal, Switch, Pressable } from 'react-native';
import * as React from 'react';
import jobs from './../../jobs.json';
import { Icon } from 'react-native-eva-icons';
import { styles } from './JobListStyles';
import { useState } from 'react/cjs/react.development';

export default function JobList({ navigation }) {

    const [scrollView, setScrollView] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const data = jobs.jobs;

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
                            {data.map((el, e) => {

                                let shifts = [];
                                el.available_shifts.forEach((shift, s) => {
                                    shifts.push(shift.hourly_pay_in_eur * shift.number_of_hours)
                                })

                                let bestShift = Math.max(...shifts);
                                let numberOfShifts = el.available_shifts.length;

                                let rating = el.average_rating;
                                let starsFull = [];
                                let starsEmpty = [];

                                for (let j = 0; j < rating; j += 1)  starsFull.push(null);
                                for (let j = 0; j < 5 - rating; j += 1)  starsEmpty.push(null);

                                if (el.campaigns.includes(item)) {

                                    return <TouchableHighlight key={e} onPress={() => navigation.navigate('Details', { data: el, favorites })} underlayColor='none'>
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
                        <HeartOutline />
                    </View>
                    <Text style={styles.campaignTitle}>Favorites</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.employerScrollView}>
                    {data.map((el, e) => {

                        if (favorites.includes(el.id)) {

                            let shifts = [];
                            el.available_shifts.forEach((shift, s) => {
                                shifts.push(shift.hourly_pay_in_eur * shift.number_of_hours)
                            })

                            let bestShift = Math.max(...shifts);
                            let numberOfShifts = el.available_shifts.length;

                            let rating = el.average_rating;
                            let starsFull = [];
                            let starsEmpty = [];

                            for (let j = 0; j < rating; j += 1)  starsFull.push(null);
                            for (let j = 0; j < 5 - rating; j += 1)  starsEmpty.push(null);

                            return <TouchableHighlight key={e} onPress={() => navigation.navigate('Details', { data: el, favorites })} underlayColor='none'>
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
                    <Text onPress={() => setFiltersVisible(!filtersVisible)}>MY TEXT </Text>
                </View>
            </View>
        </Modal>

    </SafeAreaView>
};