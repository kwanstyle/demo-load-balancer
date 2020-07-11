import Random from './Random';
import RoundRobin from './RoundRobin';
import SmoothWeightedRoundRobin from './SmoothWeightedRoundRobin';
import WeightedRandom from './WeightedRandom';
import WeightedRoundRobin from './WeightedRoundRobin';

export type DistributorType = Random | RoundRobin | SmoothWeightedRoundRobin | WeightedRandom | WeightedRoundRobin;
export { Random, RoundRobin, SmoothWeightedRoundRobin, WeightedRandom, WeightedRoundRobin };
