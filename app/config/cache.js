import { Cache }    from 'react-native-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cache = new Cache({
    namespace: "cacheJr",
    policy: {
        maxEntries: 0,
        stdTTL: 1800
    },
    backend: AsyncStorage
});

module.exports = cache;