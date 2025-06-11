# Instrutions Per Cycle 

*This are my notes on Casey's Lecture on Instructions Per Cycle*

June 10, 2025

![Performance Aware Programming](../assets/perf3.jpg)

In the prevous lecuture we learned about waste and how getting rid of it can improve our performance. Modern CPUs can do simple instructions in very diffrent ways. Not knowing about it can result in major slowdowns. In prevous we did addition of elements of arrays in a poor manner. Because we wanted to focus on waste. 


IPC and ILP mean almost same thing. IPC means number of instructions CPU can perform in single cycle. ILP is number of instructions that can be parallelized by the CPU.

```
for i = 0 ... N
{
    sum += input[i]
}
```

