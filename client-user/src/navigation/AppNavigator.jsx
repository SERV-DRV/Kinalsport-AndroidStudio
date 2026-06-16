import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../shared/constants/colors';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuthStore } from '../shared/store/authStore';

const AppNavigator = () => {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isHydrated = useAuthStore((state) => state.isHydrated);

    if(!isHydrated) {
        return (
            <View>
                <ActivityIndicator size="large" color={COLORS.primary} />
                
            </View>
        )
    }

    if(isAuthenticated) {
        return (
            <NavigationContainer>
                {isAuthenticated ? <MainTabs /> : <AuthStack />}
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },
});

export default AppNavigator;
