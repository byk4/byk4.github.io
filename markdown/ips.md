# Instrutions Per Cycle 

*This are my notes on Casey's Lecture on Instructions Per Cycle*

June 10, 2025

![Performance Aware Programming](../assets/perf3.jpg)

Waste are the unnecessary instructions which is the largest multiplier. But even after removing waste, there are necessary instructions. This variablity exists in how effiently CPUs execute them.


## IPC and ILP
IPC means average instructions executed per CPU cycle. ILP tells the CPU's ability to run mutliple instructions at the same time. Bot measure how effectively the CPU uses parallel execution units. 

Lets take a look at the below code:

```
for i = 0 ... N
{
    sum += input[i]
}
```

On testing it we get 0.8 adds/per cycle. CPU should atleast give us 1 add/per cycle. Where are we losing the performance? In a single iteration we have to do Load (`input[i]`), Add(`Sum += `), Increment(`i++`) and Compare(`i < count`) operation. 

## Loop Unrolling
Reduce the loop overhead (increment/compare) per useful operation

SingleScalar
```c
int Sum = 0;
for(int i = 0; i < n; ++i)
{
    Sum += input[i];
}
```

Unroll2Salar
Here we processes 2 elements per iterations (half the loop overhead). Still 1 serial dependency chain (add adds depend on Sum). We achive ~1 add/cycle
```c
int Sum = 0;
for(int i = 0; i < n; i+=2)
{
    Sum += input[i];
    Sum += input[i+1];
}
```

Unroll4Salar
We achive ~1 add/cycle
```c
int Sum = 0;
for(int i = 0; i < n; i+=4)
{
    Sum += input[i];
    Sum += input[i+1];
    Sum += input[i+2];
    Sum += input[i+4];
}
```