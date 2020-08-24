import Random from './Random';
import RoundRobin from './RoundRobin';
import SmoothWeightedRoundRobin from './SmoothWeightedRoundRobin';
import WeightedRandom from './WeightedRandom';
import WeightedRoundRobin from './WeightedRoundRobin';
import IPHashing from './IPHashing';
import URLHashing from './URLHashing';
import None from './None';
import LeastConnection from './LeastConnection';
import WeightedLeastConnection from './WeightedLeastConnection';

export type DistributorType =
    | Random
    | RoundRobin
    | SmoothWeightedRoundRobin
    | WeightedRandom
    | WeightedRoundRobin
    | IPHashing
    | URLHashing
    | None
    | LeastConnection
    | WeightedLeastConnection;
export {
    Random,
    RoundRobin,
    SmoothWeightedRoundRobin,
    WeightedRandom,
    WeightedRoundRobin,
    IPHashing,
    URLHashing,
    None,
    LeastConnection,
    WeightedLeastConnection,
};
