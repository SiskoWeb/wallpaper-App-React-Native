import { useEffect } from 'react';
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';


function InterstitialAdAd() {

    const { isLoaded: isLoadedInterstitialAd, isClosed: isClosedInterstitialAd, load: loadInterstitialAd, show: showInterstitialAd } = useInterstitialAd(TestIds.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: true,
    });

    useEffect(() => {
        // Start loading the InterstitialAd straight away
        loadInterstitialAd();
    }, [loadInterstitialAd]);

    return { isLoadedInterstitialAd, isClosedInterstitialAd, loadInterstitialAd, showInterstitialAd }
}

export default InterstitialAdAd 