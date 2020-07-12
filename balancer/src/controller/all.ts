import Random from './Random';
import RoundRobin from './RoundRobin';
import SmoothWeightedRoundRobin from './SmoothWeightedRoundRobin';
import WeightedRandom from './WeightedRandom';
import WeightedRoundRobin from './WeightedRoundRobin';
import IPHashing from './IPHashing';

export type DistributorType =
    | Random
    | RoundRobin
    | SmoothWeightedRoundRobin
    | WeightedRandom
    | WeightedRoundRobin
    | IPHashing;
export { Random, RoundRobin, SmoothWeightedRoundRobin, WeightedRandom, WeightedRoundRobin, IPHashing };
