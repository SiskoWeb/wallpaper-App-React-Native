import { useEffect } from 'react';
import { useRewardedAd, TestIds } from 'react-native-google-mobile-ads';


function rewardedAdsAds() {

    const { isLoaded: isLoadedRewardedAds, isEarnedReward,isClosed: isClosedRewardedAds, load: loadRewardedAds, show: showRewardedAds, reward } = useRewardedAd(TestIds.REWARDED, {
        requestNonPersonalizedAdsOnly: true,
    });

    useEffect(() => {
        // Start loading the interstitial straight away
        loadRewardedAds();
    }, [loadRewardedAds]);

    return { isLoadedRewardedAds,isEarnedReward, isClosedRewardedAds, loadRewardedAds, showRewardedAds, reward }
}

export default rewardedAdsAds