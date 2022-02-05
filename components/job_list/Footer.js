import { View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { styles } from './JobListStyles';
import PropTypes from 'prop-types';

export default function Footer({ campaigns, scrollView, filteredFavorites, filtersVisible, setFiltersVisible }) {

    return <View style={campaigns.length > 0 ? styles.footer : styles.footerEmtpy}>

        {campaigns.map((item, i) => {
            // Rendering scroll To buttons for campaigns with at least one hospital
            if (item) {
                let icon = null;
                if (item === 'Weekend shifts') icon = <Icon name='calendar-outline' fill='white' width={24} height={24} />
                else if (item === 'Best paid shifts') icon = <Icon name='checkmark-circle-outline' fill='white' width={24} height={24} />
                else if (item === 'Urgent vacancies') icon = <Icon name='alert-triangle-outline' fill='white' width={24} height={24} />
                else if (item === 'Recently added') icon = <Icon name='clock-outline' fill='white' width={24} height={24} />

                return <TouchableHighlight
                    key={i}
                    underlayColor='none'
                    onPress={() => scrollView.scrollTo({ x: 0, y: i * 390, animated: true })}
                    style={styles.footerIcon}>
                    {icon}
                </TouchableHighlight>
            }
        })}
        {filteredFavorites.length > 0 ?  // Disabled or enabled scroll To button for favorites
            <TouchableHighlight onPress={() => scrollView.scrollTo({ x: 0, y: 1560, animated: true })} underlayColor='none' style={styles.footerIcon} disabled={false}>
                <Icon name='heart-outline' fill='white' width={24} height={24} />
            </TouchableHighlight>
            :
            <TouchableHighlight underlayColor='none' style={styles.footerIconDisabled} disabled={true}>
                <Icon name='heart-outline' fill='white' width={24} height={24} />
            </TouchableHighlight>
        }

        <TouchableHighlight onPress={() => setFiltersVisible(!filtersVisible)} underlayColor='none' style={(filteredFavorites.length === 0 && campaigns.length === 0) ? styles.searchIconEmpty : styles.searchIcon}>
            <Icon name='funnel-outline' fill='#FF4F70' width={24} height={24} />
        </TouchableHighlight>

    </View>
};

Footer.propTypes = {
    campaigns: PropTypes.arrayOf(PropTypes.string).isRequired,
    scrollView: PropTypes.object,
    filteredFavorites: PropTypes.arrayOf(PropTypes.number).isRequired,
    filtersVisible: PropTypes.bool,
    setFiltersVisible: PropTypes.func.isRequired
};

Footer.defaultProps = {
    filtersVisible: false
};