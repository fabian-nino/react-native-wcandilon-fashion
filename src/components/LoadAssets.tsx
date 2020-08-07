import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text } from 'react-native';
import { InitialState, NavigationContainer } from '@react-navigation/native'

const useLoadAssets = () => {
    return true;
}

interface LoadAssetProps {
    children: ReactElement | ReactElement[];
}

const LoadAssets = ({children}: LoadAssetProps) => {
    const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
    const [initialState, setInitialState] = useState<InitialState | undefined>();
    const ready = useLoadAssets();
    useEffect(() => {
        const restoreState = async () => {
            try {
                const savedStateString = await AsyncStorage.getItem('NAVIGATION_STATE_KEY');
                const state = savedStateString ? JSON.parse(savedStateString) : undefined;
                setInitialState(state);
            } finally {
                setIsNavigationReady(true)
            }
        }

        if (!isNavigationReady) {
            restoreState();
        }
    }, [isNavigationReady]);
    const onStateChange = useCallback(
        (state) => AsyncStorage.setItem('NAVIGATION_STATE_KEY', JSON.stringify(state)), []
    );
    if (!ready || !isNavigationReady) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <NavigationContainer {...{ onStateChange, initialState}}>
           {children}
        </NavigationContainer>
    )
}

export default LoadAssets