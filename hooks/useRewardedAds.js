import { useEffect } from 'react';
import { useRewardedAd, TestIds } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';


function rewardedAdsAds() {
    const { Rewarded } = useSelector((state) => state.ads); // get wallpapers from redux


    const adUnitId =  Rewarded || 'ca-app-pub-3940256099942544/5224354917' 

    const { isLoaded: isLoadedRewardedAds, isEarnedReward, isClosed: isClosedRewardedAds, load: loadRewardedAds, show: showRewardedAds, reward } = useRewardedAd(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    useEffect(() => {
        // Start loading the interstitial straight away
        loadRewardedAds();
    }, [loadRewardedAds]);

    return { isLoadedRewardedAds, isEarnedReward, isClosedRewardedAds, loadRewardedAds, showRewardedAds, reward }
}

export default rewardedAdsAds