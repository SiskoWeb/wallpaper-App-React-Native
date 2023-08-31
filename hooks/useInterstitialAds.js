import { useEffect } from 'react';
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';


function InterstitialAdAd() {

    const { Interstitial } = useSelector((state) => state.ads); // get wallpapers from redux


    const adUnitId = Interstitial || 'ca-app-pub-3940256099942544/1033173712';
    const { isLoaded: isLoadedInterstitialAd, isClosed: isClosedInterstitialAd, load: loadInterstitialAd, show: showInterstitialAd } = useInterstitialAd(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    useEffect(() => {
        // Start loading the InterstitialAd straight away
        loadInterstitialAd();
    }, [loadInterstitialAd]);

    return { isLoadedInterstitialAd, isClosedInterstitialAd, loadInterstitialAd, showInterstitialAd }
}

export default InterstitialAdAd 