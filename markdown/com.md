# IUnkown Interface Class

DirectX 11 API is managed by a series of COM components. These clases prefixed with I
ultimately inherit from `IUnkown` interface class. `IUnknown` has three methods

1. `AddRef()` The internal reference count is incremented by 1. This method should be
called after each copy of such a pointer to ensure the count is correct.

2. `QueryInterface()` It checks if the instance implements other interface. If so, 
returns a pointer to the interface and increase the refrence count by 1.

3. `Release()` The internal reference count is reduced by 1. Only when the internal 
refrence count reaches 0 it is released.

 
