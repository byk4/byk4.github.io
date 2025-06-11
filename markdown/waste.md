# Waste 

*This are my notes on Casey's Lecture on Waste*

June 10, 2025

![Performance Aware Programming](../assets/waste.jpeg)

Traditional Optimization means tuning a program to get the best performance on specific hardware. It often requires deep hardware knowledge and creative tricks. True optimization still happens, but many programmers avoid it because it's complex and time-consuming. However, today's average software is not just slow - it's often 1000x to 10000x slower than it should be, due to common modern programming practices and tools. The problem isnt just we nned heroic optimizations - it's just developers lack general performance awareness. Peformance aware programmming is about understanding how performance works and making smart, reasonable decisions to avoid gross inefficiency. You wont need deep hardware expertise - just basic understanding and good habits. This pays off in better UX, lower server costs and more.

## Two Core Ideas About Performance

When you thing about performance, start with two simple levers:

1. Reduce the number of instructions the CPU must execute.

   * This isn't just about algorithm complexity. Various choices can increase or decrease instruction count.

2. Increase the speed at which instructions flow through the CPU

   * CPUs today are complex. Some instructions finish in 1 clock cycle other take hundreds.

   * CPU clock reate dosent guarantee uniform instruction speed.

   * The type of instruction, memory patterns, and instruction order all affect actual performance.

All performance aware thinking boils down to these two goals

## Why Software became slow

In earlier days, programmers were aware of the CPU instructions their programs generated. That awareness kepth them grounded. But as CPUs became more complex and programming languages more abstract, developers lost connection. Many now think mostly in terms of source language ( JS, Cpp, Py ) not the CPU. Performance aware programming means getting that awareness back. No matter your language consider:

* What CPU instructions will this code produce?

* How will those instructions performe?

Even in high level languages, you can make choices that help (or hinder) performace.

## Why it matters

Today, many developers write code, see it run slowly and have no idea why. They can't tell if the slowness is unavoidable or due to ineffient code.

With performance awareness, you can:

1. Predict roughly how fast something should run on a CPU

2. Recognize when you've written something unnecessarily slow code

3. Make better coding choices across any language
