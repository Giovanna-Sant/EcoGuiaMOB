import {Cache} from "react-native-cache";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const cache = new Cache({
    namespace: "cachezim",
    policy: {
        maxEntries: 0, 
        stdTTL: 300
    },
    backend:AsyncStorage
});

export default cache;