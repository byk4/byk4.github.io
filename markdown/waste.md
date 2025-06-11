# Waste

*This are my notes on Casey's Lecture on Waste*

June 10, 2025

![Performance Aware Programming](../assets/waste.jpeg)

There are only two things that we can do to improve the performance of a program:

1. Reduce the total number instrucctions for CPU to execute

2. Make instructions move more effiently through the CPU. 

Thats it, reduce the number or make it fast.

The biggest multiplier that makes the code slow is: **WASTE**. It makes program 1k to 10k times slower. Waste means literal waste. Those are the instructions that we dont want but CPU is executing and wasting it's resources and time. In modern times it's more common.

The job of CPU is to execute instructions. CPUs take very simple instructions like ADD. It takes two registers or memory addresses as input. It adds those number and overwrites the first memory with the result. So ` A = A + B ` or ` A += B `

In x86 there are other ways too like LEA. But it's slightly diffrent. On form takes two sources and a destination like ` C = A + B `

So now the question is :
> How many wasted instructions are there in a simple A+B python program?

It's very simple program just add A and B. And let's compare it with C program. 

```c
int __declspec(noinline) add(int A, int B)
{
   return(A+B);
} 

#pragma optimize("", off)
int main(int ArgCount, char Args)
{
   return add(1234, 5678);
}
```
This is because we don't want the C compiler to aggressivly optimize the code remove the addition instruction. All we told the compiler is: don't inline and don't optimize. So lets take a look at generated assembly.