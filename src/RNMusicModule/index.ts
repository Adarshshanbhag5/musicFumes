import {NativeModules} from 'react-native';
import {musicData, paletteType} from '../types/data';
const {RNGetAudioFiles} = NativeModules;

type mediaConfigType = {
  minDuration: string;
  excludeWhatsApp: boolean;
};

interface RNGetAudioFilesInterface {
  getSong(mediaConfig: mediaConfigType): Promise<musicData[]>;
  getPalette(imgUri: string, config: paletteType): Promise<paletteType>;
}

export default RNGetAudioFiles as RNGetAudioFilesInterface;
