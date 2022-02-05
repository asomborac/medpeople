import { Text, View } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { styles } from './JobListStyles';
import PropTypes from 'prop-types';

export default function CampaignHeader({ icon, title }) {
    return <View style={styles.campaign}>
        <View style={styles.campaignIcon}>
            <Icon name={icon} fill='white' width={24} height={24} />
        </View>
        <Text style={styles.campaignTitle}>{title}</Text>
    </View>
};

CampaignHeader.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string
};

CampaignHeader.defaultProps = {
    icon: 'question-mark-circle-outline',
    title: 'Campaign'
};