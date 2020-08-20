import Random from './Random';
import RoundRobin from './RoundRobin';
import SmoothWeightedRoundRobin from './SmoothWeightedRoundRobin';
import WeightedRandom from './WeightedRandom';
import WeightedRoundRobin from './WeightedRoundRobin';
import IPHashing from './IPHashing';
import URLHashing from './URLHashing';
import None from './None';

export type DistributorType =
    | Random
    | RoundRobin
    | SmoothWeightedRoundRobin
    | WeightedRandom
    | WeightedRoundRobin
    | IPHashing
    | URLHashing
    | None;
export {
    Random,
    RoundRobin,
    SmoothWeightedRoundRobin,
    WeightedRandom,
    WeightedRoundRobin,
    IPHashing,
    URLHashing,
    None,
};
