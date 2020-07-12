# load-balancer-demo

This repository contains a PoC(Proof of Concept) project of self-implemented load balancer. It is consisted of two parts: 1 load-balancer server (port 8080) and 5 application servers (port 8081-8085). 

The project is built based on NodeJS (Express + Typescript), with different strategies implemented. Execute the following command with the argument corresponding to the specific stragety to start servers:
<pre><code>
npm start -- &lt;strategy&gt;
</code></pre>

## Strategies

#### Round Robin 轮询
**Argument**: round-robin
</br>
**Code File**: ./balancer/src/controller/RoundRobin.ts

#### Weighted Round Robin 加权轮询
**Argument**: weighted-round-robin
</br>
**Code File**: ./balancer/src/controller/WeightedRoundRobin.ts

#### Smooth Weighted Round Robin 平滑加权轮询
**Argument**: smooth-weighted-round-robin
</br>
**Code File**: ./balancer/src/controller/SmoothWeightedRoundRobin.ts

#### Random 随机
**Argument**: random
</br>
**Code File**: ./balancer/src/controller/Random.ts

#### Weighted Random 加权随机
**Argument**: weighted-random
</br>
**Code File**: ./balancer/src/controller/WeightedRandom.ts

#### IP Hashing 源IP地址哈希
**Argument**: ip-hashing
</br>
**Code File**: ./balancer/src/controller/IPHashing.ts

#### Least Connection 最小连接数
In Progress 尚未完成

#### Weighted Least Connection 加权最小连接数
In Progress 尚未完成

#### URL Hashing URL哈希
In Progress 尚未完成

#### Fair 响应性能
In Progress 尚未完成

## References
